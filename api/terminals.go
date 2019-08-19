package api

import (
	"github.com/enderian/directrd/types"
	"github.com/labstack/echo"
	"net/http"
)

func terminalsGroup(g *echo.Group) {
	g.GET("/all", terminalsAll)
	g.GET("/room/:id", getRoomStatus)
	g.GET("/:terminal", getSingleTerminal)
	g.GET("/:terminal/:command/:args", execCommand)
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

// PLEASE APRIL FIRST ONLY
func execCommand(c echo.Context) error {
	var term []*types.Terminal
	terminal := c.Param("terminal")
	cmd := c.Param("command")
	//args := c.Param("args")

	if err := ctx.DB().Where("name = ?", terminal).Find(&term).Error; err != nil {
		panic(err)
	}

	finalCmd := types.Command{Terminal: term[0].Hostname, Command: cmd}

	commandQueue <- finalCmd

	return c.NoContent(http.StatusNoContent)
}
