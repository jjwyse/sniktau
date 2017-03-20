# sniktau <sub><sup>| Strava Summits </sup></sub>

--------------------------------------------------------------------------------

[![version](http://img.shields.io/badge/version-v0.0.1-blue.svg)](#) [![versioning](http://img.shields.io/badge/versioning-semver-blue.svg)](http://semver.org/) [![branching](http://img.shields.io/badge/branching-github%20flow-blue.svg)](https://guides.github.com/introduction/flow/)
[![Circle CI](https://circleci.com/gh/jjwyse/sniktau.svg?style=shield)](https://circleci.com/gh/jjwyse/sniktau)
[![Coverage Status](https://coveralls.io/repos/github/jjwyse/sniktau/badge.svg)](https://coveralls.io/github/jjwyse/sniktau)


## Overview
Pulls data from [Strava](https://strava.com) and keeps track of all peaks in the United States that you have summited.

## Installation
If you don't have `node` and `npm` installed, do [that](https://docs.npmjs.com/getting-started/installing-node) first.

> __PROTIP:__ `node` version must  be >= `v6.3.0`

```bash
# Install all necessary npm packages:
$ npm install
```

Next, if you don't already have postgres installed locally, you will need to do that.  Once you have postgres up and running, create a new database for sniktau to use.  Lastly, create a new user in postgres and grant all privileges on your database to this user.  To point the sniktau app at this postgres instance, set the following environment variables based on how your above setup.

```bash
export SNIKTAU_DB_HOST=localhost
export SNIKTAU_DB_PORT=5432
export SNIKTAU_DB_USER=
export SNIKTAU_DB_PASSWORD=
```

## Configuration
You will need to create a `private.key` file that goes in your sniktau root folder, with the private key you want to use. This private key will be used to sign authentication requests using JWT.

To run `sniktau`, you will need to set the following environment variables.

```bash
export SNIKTAU_GOOGLE_MAPS_KEY=
export SNIKTAU_STRAVA_CLIENT_SECRET=
export SNIKTAU_STRAVA_CLIENT_ID=
export SNIKTAU_REDIRECT_URL=http://localhost:7337/login
```

## Running
```bash
# Fire that bad boy up:
$ npm start
```
