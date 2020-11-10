## Prerequisites

- [Node.js](http://nodejs.org/) >= v7 <= 12 must be installed.
- [Yarn](https://yarnpkg.com/en/docs/install)

## Installation

- Run `yarn` in the repository's root directory to install everything you need for development.
- Run `yarn build` in the root directory to build the modules.

## Running Tests

- `yarn test` will run the tests once.
- `yarn coverage` will run the tests and produce a coverage report in `coverage/`.
- `yarn test:watch` will run the tests on every change.

## Building

- Run `yarn build` in the root directory to build the modules. (Required before publishing)
- Run `yarn build PACKAGE_NAME ANOTHER_PACKAGE_NAME` to only build certain packages.
- Run `yarn build:watch` to build packages on every change.

## Documentation Website Development

- Run above installation steps and then
- Run `yarn start:site` to run a development server of gatsby.
- Run `yarn build:site` to create a build of the assets for the documentation website.

## Changesets

Emotion uses [changesets](https://github.com/Noviny/changesets) to do versioning. What that means for contributors is that you need to add a changeset by running `yarn changeset` which contains what packages should be bumped, their associated semver bump types and some markdown which will be inserted into changelogs.
