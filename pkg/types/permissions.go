package types

type Permissions struct {
	Groups map[string][]string `yaml:"groups"`
}
