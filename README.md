# aurora-api

a [Sails v1](https://sailsjs.com) application

### Requirements:

- PostgreSQL, with an empty database.
- Node.js
- NPM

### Setup

Once cloned, please create the following files in config/ (changing the appropriate values):

datastores.js:

```javascript
module.exports.datastores = {
  default: {
    adapter: require('sails-postgresql'),
    url: 'postgres://{DBUSER}:{DBPASSWORD}@{DBIPADDRESS}:{DBPORT}/{DBNAME}'
  },
};
```
local.js (optional, needed to override default port of 1337):

```javascript
module.exports = {
  port: 8081
};
```

Run using `node app.js`.

### Version info

This app was originally generated on Thu Apr 05 2018 11:39:40 GMT-0500 (CDT) using Sails v1.0.0.

<!-- Internally, Sails used [`sails-generate@1.15.18`](https://github.com/balderdashy/sails-generate/tree/v1.15.18/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

