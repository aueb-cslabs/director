package types

import (
	"io/ioutil"

	"gopkg.in/yaml.v2"
)

func LoadConfiguration(file string) (*Configuration, error) {
	conf := &Configuration{}
	confBytes, err := ioutil.ReadFile(file)
	if err != nil {
		return nil, err
	}
	if err := yaml.Unmarshal(confBytes, conf); err != nil {
		return nil, err
	}
	return conf, nil
}
