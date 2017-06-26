# Etudiant-entrepreneur
[![CircleCI](https://circleci.com/gh/sgmap/etudiant-entrepreneur.svg?style=shield)](https://circleci.com/gh/sgmap/etudiant-entrepreneur)
[![Coverage Status](https://coveralls.io/repos/github/sgmap/etudiant-entrepreneur/badge.svg?branch=master)](https://coveralls.io/github/sgmap/etudiant-entrepreneur?branch=master)

Faciliter l'accès au statut et à ses bénéfices !

Le site: https://etudiant-entrepreneur.beta.gouv.fr/

## Prerequisites

* [npm](https://www.npmjs.com/)
* [Node.js](http://nodejs.org) (6.0+)
* [Docker](https://www.docker.com/) (with [docker-compose](https://docs.docker.com/compose/install/))

## Getting Started

### Node+Docker

```
npm install
npm start
```
Seul le backend est "contenerisé", le frontend est accessible via browsersync
### Build Env with Nginx front

```
npm install
npm run build
```
Frontend et backend sont dans des conteneurs.  
Le frontend est build avec npm avant d'être ajouté à un conteneur Nginx.
### 100% Docker

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```
Dans `client/webpack.config.dev.js` modifier:

```
API_URI: JSON.stringify('http://localhost:3004/api')
```

avec l'adresse du serveur Docker au lieu de `localhost`.
