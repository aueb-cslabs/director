package api

import (
	"fmt"
	"net/http"

	"github.com/enderian/directrd/pkg/types"
	"github.com/labstack/echo"
)

func usersGroup(g *echo.Group) {
	g.POST("", createUser)

	g.GET("/:username", showUser, setUser)
	g.PUT("/:username", updateUser, setUser)
	g.DELETE("/:username", deleteUser, setUser)
}

var setUser echo.MiddlewareFunc = func(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {

		user := &types.User{}
		if err := ctx.DB().Where("username = ?", c.Param("username")).Find(&user).Error; err != nil {
			return echo.NewHTTPError(
				http.StatusNotFound,
				fmt.Sprintf("user with username %s not found", c.Param("username")))
		}

		c.Set("user", user)
		return next(c)
	}
}

func showUser(c echo.Context) error {
	user := c.Get("user").(*types.User)
	user.DN = ""
	return c.JSON(http.StatusOK, user)
}

func createUser(c echo.Context) error {
	//TODO Remake
	var user types.User

	if err := ctx.DB().Save(&user).Error; err != nil {
		return err
	}

	user.DN = ""
	return c.JSON(http.StatusOK, user)
}

func updateUser(c echo.Context) error {
	user := &types.User{}
	_ = c.Bind(user)
	user.ID = c.Get("user").(*types.User).ID

	if err := ctx.DB().Save(&user).Error; err != nil {
		return err
	}

	user.DN = ""
	return c.JSON(http.StatusOK, user)
}

func deleteUser(c echo.Context) error {
	user := c.Get("user").(*types.User)
	if err := ctx.DB().Delete(user).Error; err != nil {
		return err
	}
	return c.NoContent(http.StatusNoContent)
}
