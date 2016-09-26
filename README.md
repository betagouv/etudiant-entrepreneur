# Etudiant-entrepreneur
[![CircleCI](https://circleci.com/gh/sgmap/etudiant-entrepreneur.svg?style=shield)](https://circleci.com/gh/sgmap/etudiant-entrepreneur)
[![Coverage Status](https://coveralls.io/repos/github/sgmap/etudiant-entrepreneur/badge.svg?branch=master)](https://coveralls.io/github/sgmap/etudiant-entrepreneur?branch=master)

Faciliter l'accès au statut et à ses bénéfices !

Le site: https://etudiant-entrepreneur.beta.gouv.fr/

## Prerequisites

* [npm](https://www.npmjs.com/)
* [Node.js](http://nodejs.org) (6.0+)
* [Docker](https://www.docker.com/)

## Getting Started

### Node+Docker

```
docker-compose up api
npm install
npm start
```

### 100% Docker

```
docker-compose up
```

Dans `client/webpack.config.dev.js` modifier:

```
API_URI: JSON.stringify('http://localhost:3004/api')
```

avec l'adresse du serveur Docker au lieu de `localhost`.
