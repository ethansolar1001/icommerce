## Prerequisites
```bash
NodeJS v12+
```
Notes: This project leverage nestjs extensively. Reference document: https://docs.nestjs.com/

## Sequence diagram
![sequence diagram](https://github.com/ethansolar1001/icommerce/blob/main/sequence-diagram.png)

## Db diagram
### Product service 
![product-service db diagram](https://github.com/ethansolar1001/icommerce/blob/main/product-service.png)

### Audit service
![product-service db diagram](https://github.com/ethansolar1001/icommerce/blob/main/audit-service.png)

## Project structure

```bash
── README.md
├── audit-service
│   ├── Dockerfile
│   ├── package.json
│   ├── src
│   │   ├── app.module.ts
│   │   ├── config
│   │   │   ├── configuration.ts
│   │   │   ├── database.config.ts
│   │   │   └── message-broker.config.ts
│   │   ├── main.ts
│   │   ├── migrations
│   │   │   └── 1614782384102-init.ts
│   │   ├── modules
│   │   │   └── user-activity
│   │   │       ├── dtos
│   │   │       │   └── create-user-activity.dto.ts
│   │   │       ├── user-activity.entity.ts
│   │   │       ├── user-activity.module.ts
│   │   │       ├── user-activity.providers.ts
│   │   │       ├── user-activity.repsitory.ts
│   │   │       ├── user-activity.rpc.controller.ts
│   │   │       └── user-activity.service.ts
│   │   └── shared
│   │       ├── constants.ts
│   │       ├── database
│   │       │   ├── database.module.ts
│   │       │   └── database.providers.ts
│   │       ├── dtos
│   │       │   ├── event.dto.ts
│   │       │   ├── log.dto.ts
│   │       │   └── request-context.ts
│   │       ├── logger
│   │       │   ├── http-logger.service.ts
│   │       │   ├── logger.module.ts
│   │       │   └── rpc-logger.service.ts
│   │       └── message-broker
│   │           ├── message-broker-options.ts
│   │           ├── message-broker-server.ts //Nats streaming server, use to subscribe on nats streaming channel
│   │           ├── message-broker.modules.ts
│   │           ├── message-broker.providers.ts
│   │           └── nats-streaming-client.ts
│   ├── test
│   ├── tsconfig.build.json
│   ├── tsconfig.json
│   └── yarn.lock
├── db
│   └── scripts
│       └── 01-init-dbs.sql
├── docker-compose.yml
└── product-service
    ├── Dockerfile
    ├── nest-cli.json
    ├── package.json
    ├── src
    │   ├── app.module.ts
    │   ├── config
    │   │   ├── configuration.ts
    │   │   ├── database.config.ts
    │   │   └── message-broker.config.ts
    │   ├── main.ts
    │   ├── migrations
    │   │   ├── 1614780479512-init.ts  //create table schemas
    │   │   └── 1614780722855-insert-products.ts //insert default products
    │   ├── modules
    │   │   └── product
    │   │       ├── dtos
    │   │       │   ├── create-product-req.dto.ts
    │   │       │   ├── get-product-res.dto.ts
    │   │       │   ├── index.ts
    │   │       │   ├── product.dto.ts
    │   │       │   └── update-product-req.dto.ts
    │   │       ├── product-event.handler.ts //Product event aggregator. Re-publish to nats streaming
    │   │       ├── product.entity.ts
    │   │       ├── product.module.ts
    │   │       ├── product.providers.ts
    │   │       ├── product.repository.ts
    │   │       ├── product.service.ts
    │   │       └── product.v1.controller.ts
    │   ├── shared
    │   │   ├── base-respository.ts
    │   │   ├── constants.ts
    │   │   ├── context
    │   │   │   ├── context.module.ts
    │   │   │   └── http-context.service.ts //Wrap request/user context to use in other places
    │   │   ├── database
    │   │   │   ├── database.module.ts
    │   │   │   └── database.providers.ts
    │   │   ├── dtos
    │   │   │   ├── api-error.dto.ts
    │   │   │   ├── error.dto.ts
    │   │   │   ├── event.dto.ts
    │   │   │   ├── log.dto.ts
    │   │   │   ├── request-context.ts
    │   │   │   └── validation-error.dto.ts
    │   │   ├── errors
    │   │   │   ├── bad-request-error.ts
    │   │   │   ├── index.ts
    │   │   │   ├── internal-server-error.ts
    │   │   │   └── not-found-error.ts
    │   │   ├── interfaces
    │   │   │   └── query.interface.ts
    │   │   ├── logger
    │   │   │   ├── http-logger.service.ts //Logger service to enforce consistent logging format
    │   │   │   └── logger.module.ts
    │   │   ├── message-broker
    │   │   │   ├── message-broker-options.ts
    │   │   │   ├── message-broker.modules.ts
    │   │   │   ├── message-broker.providers.ts
    │   │   │   └── nats-streaming-client.ts //Nats streaming client, use to connect & publish message to nats
    │   │   ├── middlewares
    │   │   │   └── http-all-exception.filter.ts //Error middleware to catch all expections
    │   │   ├── pipes
    │   │   │   └── query-parser.pipe.ts
    │   │   └── utlils
    │   │       ├── criteria-builder.ts
    │   │       └── numberic-transformer.ts
    │   └── swagger-config.ts
    ├── test
    │   ├── e2e
    │   └── unit
    ├── tsconfig.build.json
    ├── tsconfig.json
    └── yarn.lock
```

## Software principles & design patterns:
As I used nestjs, it inherited serveral design principles from it such as modular, single responsibility, depedency injecton..etc

I just added few patterns such as:
- Repository pattern
- Builder pattern (transform query dto to ORM criteria)

## Running

### Bootstrap nast-streaming & mariadb:
```bash
docker-compose up -d
```

### Start product-service
```bash
cd product-service
yarn install
# development mode
yarn start:dev
```

### Start audit-service
```bash
cd audit-service
yarn install
# development mode
yarn start:dev 
```

### Calling API
#### Search API

Search's operators had been supported:
- starts_with
- end_with
- contains

Filter's operators had been supported:
- gt
- lt
- gte
- lte
- btw

Example:
```curl
curl --location -g --request GET 'http://localhost:3000/api/v1/products?search[name][starts_with]=iPhone&unitPrice[btw]=[12000000,%2020000000]&sort[unitPrice]=asc'
```

#### View product detail
```curl
curl --location --request GET 'http://localhost:3000/api/v1/products/1'
```

### Create product
```curl
curl --location --request POST 'http://localhost:3000/api/v1/products' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Xiaomi Mi 10",
    "color": "Black",
    "brand": "Xiaomi",
    "unitPrice": 900000
}'
```

### Update product
```curl
curl --location --request PUT 'http://localhost:3000/api/v1/products/3' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Xiaomi Mi 8",
    "color": "Black",
    "brand": "Xiaomi",
    "unitPrice": 800000
}'
```

## Testing
```bash
cd product-service
yarn test
```

As this is an exercise, I just implement 2 tests for each testing level (integration & unittesting) for demonstration purpose:
test/integration/product.integration.spec -> for integration test
test/unit/modules/product/product-service.spec.ts

## API document
Navigate to http://localhost:3000/api for api document (product-service)

## Main frameworks/libs:
- nestjs
- expressjs
- typeorm
- jest
- mysql
- node-nats-streaming
