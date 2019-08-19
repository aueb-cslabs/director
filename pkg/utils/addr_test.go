package utils

import (
	"net"
	"reflect"
	"testing"
)

func TestExtractIP(t *testing.T) {
	type args struct {
		addr *net.IPAddr
	}

	case1, err := net.ResolveIPAddr("ip", "172.10.0.1")
	if err != nil {
		t.Fatal(err)
	}

	tests := []struct {
		name string
		args args
		want string
	}{
		{"Works", args{addr: case1}, "172.10.0.1"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := ExtractIP(tt.args.addr); got != tt.want {
				t.Errorf("ExtractIP() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestOffsetUDPPort(t *testing.T) {
	type args struct {
		addrString string
		offset     int
	}
	tests := []struct {
		name    string
		args    args
		want    *net.UDPAddr
		wantErr bool
	}{
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := OffsetUDPPort(tt.args.addrString, tt.args.offset)
			if (err != nil) != tt.wantErr {
				t.Errorf("OffsetUDPPort() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("OffsetUDPPort() = %v, want %v", got, tt.want)
			}
		})
	}
}
