package api

import (
	"fmt"
	"net/http"

	"github.com/enderian/directrd/pkg/types"
	"github.com/labstack/echo"
)

var otpReplace = []byte("otp_exists")

func usersGroup(g *echo.Group) {
	g.POST("", createUser, requirePermission("user.create"))
	g.GET("/search", searchUser, requirePermission("user.read"))
	g.GET("/:username", showUser, setUser, requirePermission("user.read"))
	g.PUT("/:username", updateUser, setUser, requirePermission("user.edit"))
	g.DELETE("/:username", deleteUser, setUser, requirePermission("user.delete"))
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

var filterUserFields = func(c echo.Context, users ...*types.User) {
	for _, user := range users {
		if hasPermission(c, "") {
			user.DN = ""
		}
		if hasPermission(c, "full_name") {
			user.FullName = ""
		}
		if hasPermission(c, "affiliation") {
			user.Affiliation = ""
		}
		if hasPermission(c, "email_address") {
			user.EmailAddress = ""
		}
		if hasPermission(c, "phone_number") {
			user.PhoneNumber = ""
		}
		if hasPermission(c, "group") {
			user.Group = ""
		}
		if len(user.OTPKey) > 0 {
			user.OTPKey = otpReplace
		}
	}
}

func searchUser(c echo.Context) error {

	var users []*types.User
	q := "%" + c.QueryParam("q") + "%"

	if err := ctx.DB().
		Where("username LIKE ?", q).
		Or("full_name LIKE ?", q).
		Find(&users).Error; err != nil {
		return err
	}

	filterUserFields(c, users...)
	return c.JSON(http.StatusOK, users)
}

func showUser(c echo.Context) error {
	user := c.Get("user").(*types.User)
	return c.JSON(http.StatusOK, user)
}

func createUser(c echo.Context) error {
	user := &types.User{}
	_ = c.Bind(user)

	if err := ctx.DB().Create(user).Error; err != nil {
		return err
	}

	filterUserFields(c, user)
	return c.JSON(http.StatusOK, user)
}

func updateUser(c echo.Context) error {
	updatedUser := &types.User{}
	_ = c.Bind(updatedUser)

	user := c.Get("user").(*types.User)

	user.FullName = updatedUser.FullName
	user.Affiliation = updatedUser.Affiliation
	user.EmailAddress = updatedUser.EmailAddress
	user.PhoneNumber = updatedUser.PhoneNumber

	user.Local = updatedUser.Local
	user.OTPKey = updatedUser.OTPKey

	if err := ctx.DB().Save(&user).Error; err != nil {
		return err
	}

	filterUserFields(c, user)
	return c.JSON(http.StatusOK, user)
}

func deleteUser(c echo.Context) error {
	user := c.Get("user").(*types.User)
	if err := ctx.DB().Delete(user).Error; err != nil {
		return err
	}
	filterUserFields(c, user)
	return c.NoContent(http.StatusNoContent)
}
