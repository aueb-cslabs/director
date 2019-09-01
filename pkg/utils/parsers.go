package utils

import (
	"io/ioutil"

	"gopkg.in/yaml.v2"
)

func ParseFromFile(file string, target interface{}) error {
	all, err := ioutil.ReadFile(file)
	if err != nil {
		return err
	}
	return yaml.Unmarshal(all, target)
}
