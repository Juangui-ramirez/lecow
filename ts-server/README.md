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