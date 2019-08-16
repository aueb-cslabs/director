package delegation

import (
	"github.com/enderian/directrd/types"
)

var ctx types.Context

// Setup the LDAP authentication delegation
func Setup(context types.Context) {
	ctx = context
}
