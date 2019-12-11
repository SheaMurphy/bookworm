# Prettier config

```
yarn add tslint-config-prettier --dev
```

Then, extend your tslint.json, and make sure tslint-config-prettier is at the end:

```
{
  "extends": [
    "tslint:latest",
    "tslint-config-prettier"
  ]
}
```
