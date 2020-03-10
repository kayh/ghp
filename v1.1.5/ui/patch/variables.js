var variables={
  "name": "@ch-post/cen-mc-rc-stream-api",
  "version": "1.1.5",
  "description": "cen-mc-rc stream API",
  "scripts": {
    "start": "apikana start src dist",
    "stop": "apikana stop",
    "create-sample": "apikana create-sample",
    "validate-samples": "apikana validate-samples",
    "test": "apikana validate-samples"
  },
  "author": "herzamk",
  "license": "Apache-2.0",
  "dependencies": {},
  "devDependencies": {
    "apikana": "0.7.6"
  },
  "customConfig": {
    "type": "stream-api",
    "domain": "post.ch",
    "author": "herzamk",
    "namespace": "cen.mc.rc",
    "shortName": "cen-mc-rc",
    "projectName": "cen-mc-rc-stream-api",
    "npmPackage": "@ch-post/cen-mc-rc-stream-api",
    "title": "cen-mc-rc stream API",
    "plugins": [
      "dotnet"
    ],
    "dotnetNamespace": "Ch.Post.PL.Api.CenMcRc.V1",
    "dotnetPackageId": "Ch.Post.PL.Api.CenMcRc",
    "mqs": "MQTT"
  },
  "_": [
    "start",
    "src",
    "dist"
  ]
}