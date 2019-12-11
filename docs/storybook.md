# Installing

```
npx -p @storybook/cli sb init --type angular
yarn add @storybook/angular --dev

yarn add @storybook/addon-options @storybook/addon-actions @storybook/addon-links @storybook/addon-notes @storybook/addon-viewport @storybook/addon-storysource @storybook/addon-a11y
```

Add configuration file to .storybook/config.js

```
import { configure, addDecorator } from "@storybook/angular";
import { setOptions } from "@storybook/addon-options";
import { withA11y } from "@storybook/addon-a11y";
import { AppModule } from "../src/app/app.module";
import { moduleMetadata } from "@storybook/angular";

// automatically import all files ending in *.stories.ts
const req = require.context("../src/app", true, /\.stories\.ts$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setOptions({
  hierarchySeparator: /\/|\./, // matches a . or /
  hierarchyRootSeparator: /\|/ //matches a |
});

addDecorator(withA11y);

addDecorator(
  moduleMetadata({
    imports: [AppModule]
  })
);

configure(loadStories, module);
```

Add imports to addons.js

```
import "@storybook/addon-actions/register";
import "@storybook/addon-links/register";
import "@storybook/addon-notes/register";
import "@storybook/addon-viewport/register";
import "@storybook/addon-storysource/register";
import "@storybook/addon-a11y/register";
```

Add base href to app.module.ts

```
import { APP_BASE_HREF } from "@angular/common";
...
providers: [{ provide: APP_BASE_HREF, useValue: "/" }]
```

Delete legacy stories directory

Add first story

```
import { storiesOf } from "@storybook/angular";

import { AppComponent } from "./app.component";

storiesOf("App", module).add("Default", () => ({
  component: AppComponent,
  props: {}
}));
```
