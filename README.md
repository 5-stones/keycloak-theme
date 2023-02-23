# Keycloak Themes

This repository is a template to be used to create Keycloak themes. It has
standard tooling for building themes localy in addition to a build process
that packages the theme up as a `.jar` file to be installed on the given
keycloak instance.

## Dev Setup

1. Clone the repo
2. `yarn install`
3. `yarn start`
  - This command will build the initial themes and watch for file changes.
4. Update the `name` and potentially the `groupId` in the `package.json`.
  - The `name` determins the name of the built `.jar` file (see below), so name
  it something that identifies the theme or set of themes that you're building.

If you want to install the themes for testing on a running keycloak instance
simply map the `dist/theme` folder to `/opt/keycloak/themes`.

## Structure

For each distinct theme, there should be a subfolder within the `theme`
directory that contains it. These themes should be created using the guidelines
of [the keycloak docs](https://www.keycloak.org/docs/latest/server_development/#creating-a-theme).

There are two sample themes already in there for demonstration purposes only.
Those themes contain a recommended structure using the `global` folder to contain
global resources/styles. You can delete these themes when you're ready.

If you only want one theme you should only have one subfolder in the `theme`
folder.

## Deploying To Production

This project will build a `.jar` theme file that can be installed in the
`/opt/keycloak/providers/` folder of a keycloak instance. To build the `.jar`
run the following:

`yarn package`

`yarn package` will generate your theme `.jar` located at
`dist/target/[NAME]-[VERSION].jar`.

## Release

The standard release command for this project is:

```
yarn version [--patch | --major | --minor | --new-version]
```

This command will:

1. Generate/update the Changelog
1. Bump the package version
1. Tag & pushing the commit


e.g.

```
yarn version --new-version=1.0.0
yarn version --patch // 1.0.0 -> 1.0.1
```
