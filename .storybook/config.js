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
