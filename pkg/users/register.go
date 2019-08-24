package users

import (
	"github.com/Knetic/govaluate"
	"github.com/enderian/directrd/pkg/types"
)

func autoRegister(user *types.User, terminal *types.Terminal) (err error) {
	if !ctx.Conf().User.AutoRegister {
		return types.ErrorNotRegistered
	}

	//defers run at the end of the function. Like finally!
	defer func() {
		if err == nil {
			//Insert the user if all else went well!
			err = ctx.DB().Create(user).Error
		}
	}()
	if ctx.Conf().User.AutoRegisterRules == nil {
		return nil
	}
	//Check ALL THE RULES.
	return ctx.Conf().User.AutoRegisterRules.ExecuteRules(govaluate.MapParameters{
		"user":     user,
		"terminal": terminal,
	})
}
