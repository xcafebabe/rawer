# Rawer Builder

If you want to use a nice static html/css/js theme like [HTML5UP Strata](https://html5up.net/strata) and apply some optimization techniques to release a version, sometimes source code doesn't provide a way to do that. Rawer is just another attempt of a builder boilerplate to help you save some time releasing your work.

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

### Install & Build a Release 

Docker Approach
```
git clone https://github.com/xcafebabe/rawer.git   \
  && cd rawer \
  && cp env-example .env \
  && sudo docker-compose up
```

Node Approach
```
git clone https://github.com/xcafebabe/rawer.git   \
  && cd rawer \
  && npm i gulp-cli -g  \
  && npm install \
  && npm run build
```

## To Develop Development

Podra acceder a la version de desarrollo en http://localhost:3000

Docker Approach

En tu .env reemplace el valor de NODE_COMMAND por `start` y sudo docker-compose up


Node Approach
npm start



## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://gitlab.com/xcafebabe/xcafebabe.gitlab.io/tags).

## Authors

* **Luis Toubes** - [xcafebabe](https://gitlab.com/xcafebabe)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
