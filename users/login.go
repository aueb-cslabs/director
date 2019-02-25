package directoryUsers

import (
	"ender.gr/directory"
	"ender.gr/directory/delegation"
	"log"
)

func Login(username, password, identifier string) error {

	user := &directory.User{Username: username}
	var err error

	//Authenticate the user using the strategies provided.
	for _, strategy := range conf.User.Authentication {
		switch strategy {
		case directory.AuthenticationLDAP:
			err = directoryDelegation.AuthenticateLdap(user, password)
		default:
			continue
		}
		if err == nil {
			break
		}
	}

	//If user has not been authenticated, show the way out.
	if err != nil {
		log.Printf("User %s was not authenticated: %s", user.Username, err.Error())
		return directory.ErrorCredentials
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

	//User has been either found or registered. Let's move on with the authorization.
	log.Printf("User %s was authenticated successfully!", user.Username)
	return nil
}