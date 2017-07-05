# Rawer Builder ![Stone Pick](https://github.com/xcafebabe/rawer/raw/master/src/assets/images/pick.jpg) ![Raw Stone](https://github.com/xcafebabe/rawer/raw/master/src/assets/images/stone.jpg)

It happens sometimes that an original source code from a nice html/css/js theme doesn't provide a way to build an optimized and shippable release of the theme. Rawer is just another attempt of a builder boilerplate to help you save some time releasing your work.

As example we use [HTML5UP Strata](https://html5up.net/strata).

## Getting Started

Rawer offers two ways of work, **Dockerized** (recommended) and **Localized** versions. With **Dockerized** version there is not need to install NodeJS and project global dependencies.

### Prerequisites

#### Docker

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

#### Local

* NodeJS (https://nodejs.org)
```
$> node --version
v7.10.0
$> npm --version
v4.2.0
```

### Install & Build a Release 

#### Docker

```
git clone https://github.com/xcafebabe/rawer.git   \
  && cd rawer \
  && cp env-example .env \
  && sudo docker-compose up
```

#### Local

```
git clone https://github.com/xcafebabe/rawer.git   \
  && cd rawer \
  && npm i gulp-cli -g  \
  && npm install \
  && npm run build
```

In both approaches you will get a ready to ship version inside `dist` folder.

## Develop mode

By default Rawer will create a release, but you can also start Rawer in serve & watch mode in order to add more magic.

#### Docker

In `.env` search property `NODE_COMMAND` and replace value from `build` to `start`, then just turn on your container through docker-compose (`sudo docker-composer up`)

#### Local

Just start the project in serve & watch mode using `npm start`

In both approaches you will get current version in http://localhost:3000

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/xcafebabe/rawer/tags).

## Authors

* **Luis Toubes** - [xcafebabe](https://gitlab.com/xcafebabe)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

Thanks to [Junksprite](http://junksprite.deviantart.com/) & [NeoZ7](http://neoz7.deviantart.com/) for artworks.
