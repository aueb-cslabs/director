package main

import (
	"log"
	"net"

	"github.com/enderian/directrd/pkg/utils"
)

func incomingUDP() *net.UDPConn {
	addr, err := utils.OffsetUDPPort(config.API.ServiceAddr, 1)
	if err != nil {
		log.Panicf("failed to parse server address: %v", err)
	}
	conn, err := net.ListenUDP("udp", addr)
	if err != nil {
		log.Panicf("failed to initialize receiver: %v", err)
	}
	return conn
}

func outgoingUDP() *net.UDPConn {
	addr, err := net.ResolveUDPAddr("udp", config.API.ServiceAddr)
	if err != nil {
		log.Panicf("failed to parse server address: %v", err)
	}
	conn, err := net.DialUDP("udp", nil, addr)
	if err != nil {
		log.Panicf("failed to initialize sender: %v", err)
	}
	return conn
}
