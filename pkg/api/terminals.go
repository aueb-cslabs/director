package api

import (
	"github.com/enderian/directrd/pkg/types"
	"github.com/labstack/echo"
	"net/http"
)

func terminalsGroup(g *echo.Group) {
	g.GET("/all", terminalsAll)
	g.GET("/room/:id", getRoomStatus)
	g.GET("/:terminal", getSingleTerminal)
	g.POST("/:terminal/execute", execCommand)
	g.POST("/", registerTerminal)
	g.DELETE("/:terminal", deleteTerminal)
	g.PUT("/:terminal", updateTerminal)
}

func terminalsAll(c echo.Context) error {
	var terminals []*types.Terminal
	if err := ctx.DB().Find(&terminals).Error; err != nil {
		panic(err)
	}

	return c.JSON(http.StatusOK, terminals)
}

func getRoomStatus(c echo.Context) error {
	var terminals []*types.Terminal
	room := c.Param("id")

	if err := ctx.DB().Where("room_id = ?", room).Find(&terminals).Error; err != nil {
		panic(err)
	}

	return c.JSON(http.StatusOK, terminals)
}

func getSingleTerminal(c echo.Context) error {
	var term []*types.Terminal
	terminal := c.Param("terminal")

	if err := ctx.DB().Where("name = ?", terminal).Find(&term).Error; err != nil {
		panic(err)
	}

	return c.JSON(http.StatusOK, term)
}

func execCommand(c echo.Context) error {
	cmd := types.Command{}
	cmd.Terminal = c.Param("terminal")
	_ = c.Bind(&cmd)

	commandQueue <- cmd

	return c.NoContent(http.StatusNoContent)
}

func registerTerminal(c echo.Context) error {
	terminal := types.Terminal{}
	_ = c.Bind(&terminal)

	if err := ctx.DB().Save(&terminal).Error; err != nil {
		return err
	}

	return c.JSON(http.StatusOK, terminal)
}

func deleteTerminal(c echo.Context) error {
	name := c.Param("terminal")
	terminal := &types.Terminal{Name: name}

	if err := ctx.DB().Delete(&terminal).Error; err != nil {
		return err
	}

	return c.NoContent(http.StatusNoContent)
}

func updateTerminal(c echo.Context) error {
	name := c.Param("terminal")
	terminal := &types.Terminal{}
	ctx.DB().Where("name = ?", name).Find(terminal)

	_ = c.Bind(&terminal)

	if err := ctx.DB().Save(&terminal).Error; err != nil {
		return err
	}

	return c.NoContent(http.StatusNoContent)
}
