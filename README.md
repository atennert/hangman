# Hangman

This is a simple website hangman implementation in TypeScript.

Play it here: [Hangman game website](https://hangman.andreas-tennert.de).

## Status
__master__:<br>
[![Build Status](https://travis-ci.org/atennert/hangman.svg?branch=master)](https://travis-ci.org/atennert/hangman)
[![Release](https://img.shields.io/github/release/atennert/hangman.svg)](https://github.com/atennert/hangman/releases)
[![License](https://img.shields.io/github/license/atennert/hangman.svg)](https://opensource.org/licenses/MIT)

## Features
* Offline capable web app (except for getting the words)
* Menu, which leads to the game or the about page
* Use the provided on-screen keyboard or a real keyboard
* Animated hanging stick figure
* Requests nouns from [Krautipsum](https://krautipsum.de)
* Landscape and portrait mode

## Sources
The code is in the `src` directory. The `src/sw` directory contains the service worker. The `src/game`, `src/ui` and `src/word-providing` directories contain the Hangman game implementation, which is used by index.ts. The `test` directory contains test cases.

The build framework uses webpack to generate a single js file for the application and compile the sw.js. The tests are run without webpack. Gulp handles the general tool chain.

Use `npm run build` to trigger the default test and build gulp job. The generated files will end up in a `./public/$npm_version` folder.

The build file also manipulates the service worker file, in which it places the current version from package.json.

## Prerequisites
* The npm scripts in package.json are currently focussing on `Linux`. MacOS might work to.
* `ImageMagic` is needed to convert the icon.svg to icon.png (using convert).
* `Node` is required to do everything.

The other dependencies are listed in package.json and can be installed with `npm i`.
