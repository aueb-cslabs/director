package sessions

import (
	"github.com/enderian/directrd/pkg/types"
)

var ctx types.Context

func Setup(context types.Context) {
	ctx = context
}
