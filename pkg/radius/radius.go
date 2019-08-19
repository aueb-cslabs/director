package radius

import (
	"github.com/enderian/directrd/pkg/types"
)

var ctx types.Context

// Setup the RADIUS part of the application
func Setup(context types.Context) {
	ctx = context
	if ctx.Conf() == nil || ctx.Conf().Radius.SharedSecret == "" {
		return
	}
	go startAuthServer()
	go startAccServer()
}
