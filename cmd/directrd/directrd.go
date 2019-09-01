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
	"github.com/enderian/directrd/pkg/utils"
)

var (
	configFlag      = flag.String("config", "config.yml", "Configuration file to be used")
	commandsFlag    = flag.String("commands", "commands.yml", "Command mapping file to be used")
	permissionsFlag = flag.String("permissions", "permissions.yml", "Groups and permissions file to be used")
)

func main() {
	flag.Parse()

	configuration := &types.Configuration{}
	if err := utils.ParseFromFile(*configFlag, configuration); err != nil {
		log.Fatalf("failed to load configuration file: %v", err)
	}
	ctx := types.NewContextWithConfig(context.Background(), configuration)

	commands := &types.Commands{}
	if err := utils.ParseFromFile(*commandsFlag, commands); err != nil {
		log.Printf("failed to load commands file, skipping: %v", err)
	} else {
		ctx = types.NewContextWithCommands(ctx, commands)
	}

	permissions := &types.Permissions{}
	if err := utils.ParseFromFile(*permissionsFlag, permissions); err != nil {
		log.Printf("failed to load permissions file, skipping: %v", err)
	} else {
		ctx = types.NewContextWithPermissions(ctx, permissions)
	}

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
