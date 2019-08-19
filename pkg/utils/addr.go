package utils

import (
	"net"
	"strings"
)

// ExtractHost from an net.Addr
func ExtractHost(addr net.Addr) string {
	if addr == nil {
		return ""
	}
	return strings.Split(addr.String(), ":")[0]
}

// OffsetUDPPort by a specified offset
func OffsetUDPPort(addrString string, offset int) (*net.UDPAddr, error) {
	addr, err := net.ResolveUDPAddr("udp", addrString)
	if err != nil {
		return nil, err
	}
	addr.Port += offset
	return addr, nil
}
