package main

import (
	"context"
	"flag"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/enderian/directrd/pkg/api"
	"github.com/enderian/directrd/pkg/database"
	"github.com/enderian/directrd/pkg/delegation"
	"github.com/enderian/directrd/pkg/radius"
	"github.com/enderian/directrd/pkg/sessions"
	"github.com/enderian/directrd/pkg/terminals"
	"github.com/enderian/directrd/pkg/types"
	"github.com/enderian/directrd/pkg/users"
)

var (
	configFlag = flag.String("config", "config.yml", "Configuration file to be used")
)

func main() {
	flag.Parse()

	configuration, err := types.LoadConfiguration(*configFlag)
	if err != nil {
		log.Fatalf("failed to load configuration: %v", err)
	}

	//Start all the things
	ctx := types.NewContextWithConfig(context.Background(), configuration)
	ctx = database.SetupDatabase(ctx)
	ctx = database.SetupRedis(ctx)

	types.Setup(ctx)
	users.Setup(ctx)
	terminals.Setup(ctx)

	delegation.Setup(ctx)
	radius.Setup(ctx)
	sessions.Setup(ctx)

	api.Setup(ctx)

	//If shutdown signal received, exit gracefully.
	sign := make(chan os.Signal)
	signal.Notify(sign)

	for {
		switch <-sign {
		case syscall.SIGKILL:
		case syscall.SIGTERM:
		case syscall.SIGINT:
			log.Println("Server exiting...")
			database.CloseDatabase(ctx)
			return
		}
	}
}
