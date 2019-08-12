package utils

import "net"

func ExtractAddr(addr net.Addr) string {
	udpAddr := addr.(*net.UDPAddr)
	return udpAddr.IP.String()
}
