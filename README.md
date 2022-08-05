# Orbito Render

[Orbito Render](https://github.com/orbiter-cloud/render-service): microservice to render data + template as HTML.

For available configuration check the source repo [readme](https://github.com/orbiter-cloud/render-service#config).

1. [Start Render API](#start-render-api)
2. [Setup Template](#setup-template)
3. [Use Render Client](#use-render-client)

## Start Render API

Simply fork / clone / copy this repository, start the container - than setup [a template](#setup-template):

```shell
docker-compose up
```

Orbito Render API: [localhost:3000](http://localhost:3000) (incl. OpenAPI Spec & Docs)

## Setup Template

Creates a new `template` folder & file structure in the `templates` folder.

Uses the mounts from `docker-compose.yml`:

```shell
docker-compose run --rm render node cli.js tpl:init my-tpl
```

## Use Render Client

Renders a basic template, using the NodeJS client and a minimalistic example setup:

```shell
cd client
npm i
npm start
```

Static file server: [localhost:3001](http://localhost:3001) which hosts [client/build](./client/build)

## License

This project is free software distributed under the [**MIT License**](./LICENSE).

© 2022 [bemit UG (haftungsbeschränkt)](https://bemit.codes)
