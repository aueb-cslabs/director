package types

import (
	"fmt"
	"time"
)

type Status string

const (
	StatusOffline  Status = "OFFLINE"
	StatusOnline   Status = "ONLINE"
	StatusLocked   Status = "LOCKED"
	StatusBusy     Status = "BUSY"
	StatusLoggedIn Status = "LOGGED_IN"
)

type Terminal struct {
	model

	Name     string `json:"name" gorm:"primary_key"`
	Hostname string `json:"hostname"`

	RoomID uint `json:"room_id"`
	Room   Room `json:"-"`

	PositionX       uint   `json:"pos_x"`
	PositionY       uint   `json:"pos_y"`
	OperatingSystem string `json:"operating_system"`

	Status Status `json:"status" sql:"-"`
}

const statusKey = "directrd.terminal.%s.status"

func (t *Terminal) SaveStatus() {
	_, err := ctx.Redis().Set(fmt.Sprintf(statusKey, t.Name), string(t.Status), time.Second*5).Result()
	if err != nil {
		panic(err)
	}
}

/* These are GORM hooks, see here:
   http://gorm.io/docs/hooks.html  */

func (t *Terminal) AfterFind() error {
	if res, err := ctx.Redis().Get(fmt.Sprintf(statusKey, t.Name)).Result(); err == nil {
		t.Status = Status(res)
	} else {
		t.Status = StatusOffline
	}
	return nil
}

func (t *Terminal) BeforeSave() error {
	t.SaveStatus()
	return nil
}
