package directoryRadius

import (
	"layeh.com/radius"
	"layeh.com/radius/rfc2866"
	"log"
)

func startAccServer() {

	handler := func(w radius.ResponseWriter, r *radius.Request) {
		//username := rfc2865.UserName_GetString(r.Packet)
		status := rfc2866.AcctStatusType_Get(r.Packet)
		//sessionId := rfc2866.AcctSessionID_GetString(r.Packet)

		switch status {
		case rfc2866.AcctStatusType_Value_Start:
		case rfc2866.AcctStatusType_Value_Stop:
		case rfc2866.AcctStatusType_Value_InterimUpdate:
		}
	}

	server := radius.PacketServer{
		Addr: conf.Radius.AccountingAddress,
		Handler:      radius.HandlerFunc(handler),
		SecretSource: radius.StaticSecretSource([]byte(conf.Radius.SharedSecret)),
	}
	if server.Addr == "" {
		server.Addr = ":1813"
	}

	log.Printf("Starting accounting server on %s", server.Addr)
	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("Error while starting RADIUS accounting server: %s", err.Error())
	}
}
