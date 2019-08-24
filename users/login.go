package directoryUsers

import (
	"ender.gr/directrd/delegation"
	"ender.gr/directrd/sessions"
	"ender.gr/directrd/types"
	"golang.org/x/crypto/bcrypt"
	"log"
)

func Login(username, password, identifier string) error {

	user := &types.User{Username: username}
	var err error

	//Authenticate the user using the strategies provided.
	for _, strategy := range conf.User.Authentication {
		switch strategy {
		case types.AuthenticationLDAP:
			err = directoryDelegation.AuthenticateLdap(user, password)
			break
		case types.AuthenticationCached:
			err = authenticateLocal(*user, password, false)
			break
		case types.AuthenticationLocal:
			err = authenticateLocal(*user, password, true)
			break
		}
		if err == nil {
			break
		}
	}

	//If user has not been authenticated, show the way out.
	if err != nil {
		log.Printf("User %s was not authenticated: %s", user.Username, err.Error())
		return types.ErrorCredentials
	}

	if err = findUser(user); err == nil {
		//User has been found, do the necessary work.
		goto UserFound
	}

	//Try to auto-register user.
	if err = autoRegister(user, identifier); err != nil {
		log.Printf("User %s was not authenticated: %s", user.Username, err.Error())
		return err
	}

UserFound:

	//Try to authorize user.
	if err := sessions.Authorize(user, identifier); err != nil {
		log.Printf("User %s was not authorized: %s", user.Username, err.Error())
		return err
	}

	//User has been either found or registered. Settings password and saving locally.
	user.Password, _ = bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err := updateUser(user); err != nil {
		log.Printf("Unable to save new user (%s): %s", user.Username, err.Error())
		return err
	}

	log.Printf("User %s was authenticated successfully!", user.Username)
	return nil
}
