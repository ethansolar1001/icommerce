## Prerequisites

## Architecture 

## Db diagram

## Project structure

```bash
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
│   │   ├── 1614705202501-init.ts //create table schemas
│   │   └── 1614705230265-insert-products.ts //insert default products
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
│   │   │   └── nats-streaming-client.ts
│   │   ├── middlewares
│   │   │   └── http-all-exception.filter.ts //Error middleware to catch all expections
│   │   ├── pipes
│   │   │   └── query-parser.pipe.ts //Middleware to validate & transform url params to query dto
│   │   └── utlils
│   │       ├── criteria-builder.ts //Build typeorm criteria from query dto (search, sort, filter)
│   │       └── numberic-transformer.ts //Convert decimal in db to number in entity
│   └── swagger-config.ts
├── test
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```

## Deployment

## Running

## Testing

