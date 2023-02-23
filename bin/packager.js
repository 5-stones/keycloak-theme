const fs = require('fs');
const { join } = require('path');
const cp = require('child_process');

const ROOT = join(__dirname, '../dist/src/main/resources')
const VALID_THEME_TYPES = ['account', 'email', 'login', 'admin'];

const createDirStructure = () => {
  fs.mkdirSync(join(ROOT, 'theme'), { recursive: true });
  fs.mkdirSync(join(ROOT, 'META-INF'), { recursive: true });
  fs.cpSync(
    join(__dirname, '../dist/theme'),
    join(ROOT, 'theme'),
    { recursive: true },
  );
};

const createThemeManifest = () => {
  const themeDir = join(ROOT, `/theme`);
  const dirs = fs.readdirSync(themeDir);
  const manifest = { themes: [] };
  for (let theme of dirs) {
    const types = fs.readdirSync(join(themeDir, theme))
      .filter(dir => VALID_THEME_TYPES.includes(dir))
    ;

    manifest.themes.push({
      name: theme,
      types,
    });
  }

  fs.writeFileSync(
    join(ROOT, 'META-INF/keycloak-themes.json'),
    JSON.stringify(manifest, null, 2),
  );

  return manifest;
}

const createPom = (groupId, artifactId, version) => {
  const pom = [
      `<?xml version="1.0"?>`,
      `<project xmlns="http://maven.apache.org/POM/4.0.0"`,
      `	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"`,
      `	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">`,
      `	<modelVersion>4.0.0</modelVersion>`,
      `	<groupId>${groupId}</groupId>`,
      `	<artifactId>${artifactId}</artifactId>`,
      `	<version>${version}</version>`,
      `	<name>${artifactId}</name>`,
      `	<description />`,
      `</project>`
  ].join("\n");

  const pomRoot = join(__dirname, '../dist/pom.xml');
  fs.writeFileSync(pomRoot, pom);
}

const run = async () => {
  createDirStructure();
  createThemeManifest();
  const pkg = require('../package.json');
  const groupId = pkg.groupId;
  const version = pkg.version;
  const artifact = pkg.name;
  createPom(groupId, artifact, version);
  cp.execSync("mvn package", { "cwd": join(__dirname, '../dist') });
}

run();
