package directory

type User struct {
	Username string `json:"username"`
	FullName string `json:"full_name"`
	Affiliation string `json:"affiliation"`

	DN string `json:"dn"`

	Extras map[string]string `json:"extras"`
}
