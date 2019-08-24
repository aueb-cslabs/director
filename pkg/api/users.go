package api

import (
	"fmt"
	"net/http"

	"github.com/enderian/directrd/pkg/delegation"
	"github.com/enderian/directrd/pkg/types"
	"github.com/labstack/echo"
)

func usersGroup(g *echo.Group) {
	g.GET("/:username", getSingleUser)
	g.POST("/:username", registerUser)
	g.PUT("/:username", updateUser)
	g.DELETE("/:username", deleteUser)
}

func getSingleUser(c echo.Context) error {
	username := c.Param("username")

	user := &types.User{Username: username}

	err := delegation.FillLdap(user)
	// Hide DN
	user.DN = ""

	if err != nil {
		return c.JSON(http.StatusOK, "Username does not exist")
	}

	return c.JSON(http.StatusOK, user)
}

func registerUser(c echo.Context) error {
	username := c.Param("username")

	user := &types.User{Username: username}

	_ = delegation.FillLdap(user)
	user.DN = ""

	if err := ctx.DB().Save(&user).Error; err != nil {
		return err
	}

	return c.JSON(http.StatusOK, user)
}

func updateUser(c echo.Context) error {
	username := c.Param("username")

	user := &types.User{Username: username}

	ctx.DB().Where("username = ?", username).Find(user)

	_ = c.Bind(user)

	if err := ctx.DB().Save(&user).Error; err != nil {
		return err
	}

	return c.NoContent(http.StatusNoContent)
}

func deleteUser(c echo.Context) error {
	username := c.Param("username")

	user := &types.User{Username: username}

	test := &types.User{}
	ctx.DB().Where("username = ?", username).Find(test)
	fmt.Println(test)

	if err := ctx.DB().Delete(user).Error; err != nil {
		return err
	}

	return c.NoContent(http.StatusNoContent)
}
