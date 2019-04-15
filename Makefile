.PHONY: install audit-fix build

TEST_PATH=./

help:
	@echo "    install"
	@echo "       Install node modules into respective folder."
	@echo "    audit-fix"
	@echo "       Fix vulnerabilities."
	@echo "    build"
	@echo "       Make productive build."

install:
	docker run -it \
		-v $(shell pwd):/home/node/app \
		-v $(shell pwd)/node_modules:/home/node/app/node_modules \
		aroemelt/ethicbot:webchat \
		npm install

audit-fix:
	docker run -it \
		-v $(shell pwd):/home/node/app \
		-v $(shell pwd)/node_modules:/app/node_modules \
		aroemelt/ethicbot:webchat \
		npm audit fix

build:
	docker run -it \
		-v $(shell pwd)/public:/home/node/app/public \
		-v $(shell pwd)/src:/home/node/app/src \
		-v $(shell pwd)/build:/home/node/app/build \
		aroemelt/ethicbot:webchat \
		sudo npm run build

