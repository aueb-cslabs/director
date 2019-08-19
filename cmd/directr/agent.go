package main

import (
	"fmt"
	"github.com/kardianos/service"
	"os"
)


type program struct{}

func (p *program) Start(s service.Service) error {
	if hstn, err := os.Hostname(); err == nil {
		hostname = hstn
	} else {
		return fmt.Errorf("unable to retrieve machines hostname: %v", err)
	}

	go p.run()
	return nil
}

func (p *program) run() {
	logger.Infof("directrd agent starting")

	greet()
	go runKeepAlive()
	go runCommandReceiver()
}

func (p *program) Stop(s service.Service) error {
	logger.Infof("directrd agent stopping")

	goingDown()
	return nil
}
