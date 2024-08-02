# LeCow App Server

Backend Server for LeCow

## Development flow

* `npm install`
* Copy `.env.template` to `.env` and change values

Docker compose file provided to initialize database and adminer UI (depends on .env file)
```
docker compose up
```

* Start server with `npm run dev`

## Test

### Aceptance Tests

* Ensure database and server are up and running correctly
* Run `npm run acceptance-test`

### OpenAPI manual test

* install vs code extension `arjun.swagger-viewer`
* Ensure database and server are up and running correctly
* Open file' `ts-server/openapi.yml`
    * Execute `Preview Swagger` command with Ctrl+P `> Preview Swagger`
    * Within preview endpoint can be called