package types

import (
	"github.com/jinzhu/gorm/dialects/postgres"
)

type UserType uint

const (
	UserNormal UserType = iota + 1
	UserAdmin
	UserSuperadmin
)

type User struct {
	Model

	Username string `json:"username" sql:",pk"`
	FullName string `json:"full_name"`
	DN       string `json:"dn,omitempty"`

	Affiliation  string `json:"affiliation"`
	EmailAddress string `json:"email_address,omitempty"`
	PhoneNumber  string `json:"phone_number,omitempty"`

	Local    bool   `json:"local,omitempty"`
	Password []byte `json:"-"`
	OTPKey   []byte `json:"otp_key,omitempty"`

	Group             string          `json:"group"`
	Permissions       postgres.Hstore `json:"permissions"`
	ActualPermissions []string        `sql:"-" json:"actual_permissions"`

	Extras postgres.Hstore `json:"extras,omitempty"`
}

func (u *User) AfterFind() (err error) {
	var permissions []string
	for _, perm := range ctx.Permissions().Groups[u.Group] {
		permissions = append(permissions, perm)
	}
	for perm := range u.Permissions {
		permissions = append(permissions, perm)
	}
	u.ActualPermissions = permissions
	return
}
