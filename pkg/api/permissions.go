package api

import (
	"github.com/labstack/echo"
)

var hasPermission = func(c echo.Context, perm string) bool {
	return true
}

var requirePermission = func(perm string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			return next(c)
		}
	}
}
