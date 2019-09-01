package radius

import (
	"log"

	"github.com/enderian/directrd/pkg/sessions"
	"github.com/enderian/directrd/pkg/types"
	"github.com/enderian/directrd/pkg/utils"
	"layeh.com/radius"
	"layeh.com/radius/rfc2865"
	"layeh.com/radius/rfc2866"
)

func startAccServer() {

	if ctx.Conf().Radius.DisabledAccounting {
		return
	}

	handler := func(rw radius.ResponseWriter, r *radius.Request) {
		username := rfc2865.UserName_GetString(r.Packet)
		status := rfc2866.AcctStatusType_Get(r.Packet)
		sessionID := rfc2866.AcctSessionID_GetString(r.Packet)

		terminal := &types.Terminal{}
		err := ctx.DB().Where("addr = ?", utils.ExtractHost(r.RemoteAddr)).
			Find(terminal).Error
		if err != nil {
			packet := r.Packet.Response(radius.CodeAccessReject)
			rw.Write(packet)
			log.Printf("Terminal not recognized from RADIUS packet: %s", err.Error())
			return
		}

		switch status {
		case rfc2866.AcctStatusType_Value_Start:
			_ = sessions.Start(sessionID, username, terminal)
		case rfc2866.AcctStatusType_Value_Stop:
			_ = sessions.End(sessionID, username, terminal)
		case rfc2866.AcctStatusType_Value_InterimUpdate:
			_ = sessions.Update(sessionID, username, terminal)
		}

		packet := r.Packet
		packet = r.Packet.Response(radius.CodeAccountingResponse)
		if err := rw.Write(packet); err != nil {
			log.Fatalf("Error while responding to RADIUS accounting: %s", err.Error())
		}
	}

	server := radius.PacketServer{
		Addr:         ":1813",
		Handler:      radius.HandlerFunc(handler),
		SecretSource: radius.StaticSecretSource([]byte(ctx.Conf().Radius.SharedSecret)),
	}

	log.Printf("Starting RADIUS accounting server on %s", server.Addr)
	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("Error while starting RADIUS accounting server: %s", err.Error())
	}
}
