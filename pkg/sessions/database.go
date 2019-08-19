package sessions

import (
	"github.com/enderian/directrd/pkg/types"
)

func findSession(session *types.Session) error {
	return ctx.DB().Where("internal_id = ?", session.InternalId).Find(&session).Error
}

func findSessions(session *types.Session) ([]*types.Session, error) {
	var sessions []*types.Session
	err := ctx.DB().
		Where("terminal_id = ? OR username = ?", session.TerminalID, session.Username).
		Find(&sessions).
		Error
	return sessions, err
}
