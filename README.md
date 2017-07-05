# Rawer Builder

If you want to use a nice static html/css/js theme, sometimes source code doesn't have scripts to optimize released versions. Rawer is just another attempt of a builder boilerplate to help you save some time releasing your work.

## Getting Started

**Need translation**
Tienes dos approach, Dockerized y Localized version. La unica diferencia entre las dos es que con Docker no te hara falta tener instalado NodeJS y sus dependencias globales.

### Prerequisites

Si usas Docker, al menos estas versiones

* Docker (https://www.docker.com/)

```
$ docker --version
Docker version 17.03.0-ce, build 3a232c8
```

* Docker Compose (https://docs.docker.com/compose/)

```
$> docker-compose --version
docker-compose version 1.11.2, build dfed245
```

Si usas NodeJS, al menos estas versiones

node --version

npm --version

### Install & Run

Docker Approach
```
git clone https://github.com/xcafebabe/rawer.git   \
  && cd rawer \
  && cp env-example .env \
  && sudo docker-compose up
```
Once the site is up & running (wait until you see `Hexo is running at http://localhost:4000/. Press Ctrl+C to stop.` on the console), open a browser
and go to http://localhost:4000

Node Approach
```
git clone https://github.com/xcafebabe/rawer.git   \
  && cd rawer \
  && npm i gulp-cli -g  \
  && npm install \
  && npm start \
```

## Development

TBD

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://gitlab.com/xcafebabe/xcafebabe.gitlab.io/tags).

## Authors

* **Luis Toubes** - [xcafebabe](https://gitlab.com/xcafebabe)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
