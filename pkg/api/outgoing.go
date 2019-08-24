package api

import (
	"log"
	"net"

	"github.com/enderian/directrd/pkg/terminals"
	"github.com/enderian/directrd/pkg/types"
	"github.com/enderian/directrd/pkg/utils"
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

		terminal := &types.Terminal{}
		err := ctx.DB().Where("name = ?", cmd.GetTerminal()).Find(terminal).Error
		if err != nil {
			log.Printf("error while sending command: %v", err)
			continue
		}

		conn := outgoingUDP(terminal.Addr)
		msg, err := proto.Marshal(&cmd)
		if err != nil {
			log.Printf("error while sending command: %v", err)
			continue
		}
		conn.Write(msg)
		log.Printf("sent command to %s", terminal.Addr)
	}
}
