package types

import (
	"context"
	"time"

	"github.com/go-redis/redis"
	"github.com/jinzhu/gorm"
)

type contextType uint

const (
	confContext contextType = iota
	databaseContext
	redisContext
	commandsContext
	permissionsContext
)

type Context struct {
	ctx context.Context
}

func NewContextWithConfig(ctx context.Context, conf *Configuration) Context {
	return Context{context.WithValue(ctx, confContext, conf)}
}

func NewContextWithDB(ctx context.Context, db *gorm.DB) Context {
	return Context{context.WithValue(ctx, databaseContext, db)}
}

func NewContextWithRedis(ctx context.Context, red *redis.Client) Context {
	return Context{context.WithValue(ctx, redisContext, red)}
}

func NewContextWithCommands(ctx context.Context, cmds *Commands) Context {
	return Context{context.WithValue(ctx, commandsContext, cmds)}
}

func NewContextWithPermissions(ctx context.Context, perms *Permissions) Context {
	return Context{context.WithValue(ctx, permissionsContext, perms)}
}

func (c Context) Deadline() (time.Time, bool) {
	return c.ctx.Deadline()
}

func (c Context) Done() <-chan struct{} {
	return c.ctx.Done()
}

func (c Context) Err() error {
	return c.ctx.Err()
}

func (c Context) Value(key interface{}) interface{} {
	return c.ctx.Value(key)
}

func (c Context) Conf() *Configuration {
	return c.ctx.Value(confContext).(*Configuration)
}

func (c Context) DB() *gorm.DB {
	return c.ctx.Value(databaseContext).(*gorm.DB)
}

func (c Context) Redis() *redis.Client {
	return c.ctx.Value(redisContext).(*redis.Client)
}

func (c Context) Commands() *Commands {
	return c.ctx.Value(commandsContext).(*Commands)
}

func (c Context) Permissions() *Permissions {
	return c.ctx.Value(permissionsContext).(*Permissions)
}
