import { storiesOf } from "@storybook/angular";

import { AppComponent } from "./app.component";

storiesOf("App", module).add("Default", () => ({
  component: AppComponent,
  props: {}
}));
