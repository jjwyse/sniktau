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

## Configuration
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
