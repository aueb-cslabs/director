package main

import (
	"ender.gr/directory"
	"ender.gr/directory/delegation"
	"ender.gr/directory/radius"
	"ender.gr/directory/users"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"log"
	"os"
	"syscall"
)

func main() {
	configuration := &directory.MasterConfiguration{}
	confBytes, err := ioutil.ReadFile("config.yml")
	if err != nil {
		log.Panic(err)
	}
	if err := yaml.Unmarshal(confBytes, configuration); err != nil {
		log.Panic(err)
	}

	directoryUsers.Setup(configuration)
	directoryDelegation.Setup(configuration)

	if configuration.Radius != nil {
		directoryRadius.Setup(configuration)
	}

	ch := make(chan os.Signal)
	if <- ch == syscall.SIGTERM {}
}
