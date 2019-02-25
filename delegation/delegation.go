package directoryDelegation

import "ender.gr/directory"

var conf *directory.MasterConfiguration

func Setup(configuration *directory.MasterConfiguration) {
	conf = configuration
}
