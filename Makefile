build:
	go build -o bin/directr github.com/enderian/directrd/cmd/directr
	go build -o bin/directrd github.com/enderian/directrd/cmd/directrd

start: build
	bin/directrd

start-agent: build
	bin/directr

test: build

generate-proto:
	protoc -I=./proto --go_out=./pkg/types proto/*.proto