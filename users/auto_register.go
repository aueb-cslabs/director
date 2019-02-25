package directoryUsers

import (
	"ender.gr/directory"
	"github.com/Knetic/govaluate"
)

func autoRegister(user *directory.User, identifier string) (err error) {
	if !conf.User.AutoRegister {
		return directory.ErrorNotRegistered
	}

	//defers run at the end of the function. Like finally!
	defer func() {
		if err == nil {
			//Insert the user if all else went well!
			err = insertUser(user)
		}
	}()

	if conf.User.AutoRegisterRules == nil {
		return nil
	}
	//Check ALL THE RULES.
	return directory.ExecuteRules(conf.User.AutoRegisterRules, govaluate.MapParameters{
		"user": user,
		"machine": identifier,
	})
}