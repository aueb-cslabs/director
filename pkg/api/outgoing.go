package api

import (
	"log"
	"net"

	"github.com/enderian/directrd/pkg/utils"
	"github.com/enderian/directrd/pkg/terminals"
	"github.com/enderian/directrd/pkg/types"
	"github.com/golang/protobuf/proto"
)

var commandQueue = make(chan types.Command)

func outgoingUDP(destination string) *net.UDPConn {
	addr, err := utils.OffsetUDPPort(ctx.Conf().API.ServiceAddr, 1)
	if err != nil {
		log.Panicf("failed to parse address: %v", err)
	}
	conn, err := net.DialUDP("udp", nil, addr)
	if err != nil {
		log.Panicf("failed to initialize sender: %v", err)
	}
	return conn
}

func startInternalOutgoing() {
	terminals.SetupQueue(commandQueue)

	for {
		cmd := <-commandQueue
		addr, err := types.FindAddrFromTerminal(cmd.GetTerminal())
		if err != nil {
			log.Printf("error while sending command: %v", err)
			continue
		}

		conn := outgoingUDP(addr)
		msg, err := proto.Marshal(&cmd)
		if err != nil {
			log.Printf("error while sending command: %v", err)
			continue
		}
		conn.Write(msg)
		log.Printf("sent command to %s", addr)
	}
}
