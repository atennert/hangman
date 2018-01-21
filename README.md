# Hangman

This is a simple website hangman implementation in TypeScript.

Play it here: [Hangman game website](https://hangman.andreas-tennert.de).

## Status
__master__:<br>
[![Build Status](https://travis-ci.org/atennert/hangman.svg?branch=master)](https://travis-ci.org/atennert/hangman)
[![Release](https://img.shields.io/github/release/atennert/hangman.svg)](https://github.com/atennert/hangman/releases)
[![License](https://img.shields.io/github/license/atennert/hangman.svg)](https://opensource.org/licenses/MIT)

__devel__:<br>
[![Build Status](https://travis-ci.org/atennert/hangman.svg?branch=devel)](https://travis-ci.org/atennert/hangman)

## Features
* Offline capable web app
* Start a new run with the start/reset button
* Use the provided on-screen keyboard or a real keyboard
* Animated hanging stick figure
* List of a few german nouns (It's temporary. I'm trying to find a service for that. If I can't find one, I'll make the list bigger eventually.)
* Landscape and portrait mode

## Sources
The code is in the `src` directory. The `src/sw` directory contains the service worker. The `src/game`, `src/ui` and `src/word-providing` directories contain the Hangman game implementation, which is used by index.ts. The `test` directory contains test cases.

The build framework uses webpack to generate a single js file for the application and compile the sw.js. The tests are run without webpack.

## Prerequisites
* The npm scripts in package.json are currently focussing on `Linux`. MacOS might work to.
* `sassc` needs to be installed to compile the scss files.
* `ImageMagic` is needed to convert the icon.svg to icon.png (using convert).
* `Node` is required to do everything.

The other dependencies are listed in package.json and can be installed with `npm i`.

## Commands
* Use `npm run test` to test.
* Use `npm run lint` to check the linting of scss an ts sources.
* Use `npm run build` to build.
