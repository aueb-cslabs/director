package directory

type MasterConfiguration struct {
	User   *UserConfiguration   `yaml:"user"`
	Radius *RadiusConfiguration `yaml:"radius"`
	LDAP   *LdapConfiguration   `yaml:"ldap"`
}

type UserConfiguration struct {
	Authentication []AuthenticationStrategy `yaml:"authentication"`

	AutoRegister      bool   `yaml:"auto_register"`
	AutoRegisterRules []Rule `yaml:"auto_register_rules"`

	RegistrationFilter string `yaml:"registration_filter"`
}

type RadiusConfiguration struct {
	AuthAddress       string `yaml:"auth_address"`
	AccountingAddress string `yaml:"accounting_address"`

	SharedSecret string `yaml:"shared_secret"`
}

type LdapConfiguration struct {
	Address string `yaml:"address"`
	Port    int    `yaml:"port"`
	UseTLS  bool   `yaml:"use_tls"`

	BaseDN       string `yaml:"base_dn"`
	BindUsername string `yaml:"bind_username"`
	BindPassword string `yaml:"bind_password"`

	SearchClass string `yaml:"search_class"`

	UsernameAttribute    string `yaml:"username_attribute"`
	FullNameAttribute    string `yaml:"full_name_attribute"`
	AffiliationAttribute string `yaml:"affiliation_attribute"`

	ExtraAttributes map[string]string `yaml:"extra_attributes"`
	FixFullNameCase bool              `yaml:"fix_full_name_case"`
}

