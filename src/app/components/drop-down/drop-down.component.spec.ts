import {
  TestComponent,
  IntegrationComponent
} from "@nology/angular-test-simplifier";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DropdownComponent } from "./drop-down.component";
import { Component } from "@angular/core";

@Component({
  template: `
    <app-drop-down
      [label]="label"
      [actionLabel]="actionLabel"
      (action)="testFunc($event)"
    ></app-drop-down>
  `
})
class ParentComponent {
  label: string;
  actionLabel: string;
  testFunc = (input: any) => null;
}

describe("DropdownComponent", () => {
  let testDropDown: TestComponent<DropdownComponent>;

  beforeEach(() => {
    testDropDown = new TestComponent<DropdownComponent>(DropdownComponent);
    testDropDown.configure({
      imports: [FontAwesomeModule]
    });
    testDropDown.initialise();
  });

  it("should create", () => {
    expect(testDropDown).toBeTruthy();
  });
});

describe("DropdownComponent Integration tests", () => {
  let testDropDown: IntegrationComponent<DropdownComponent, ParentComponent>;

  beforeEach(() => {
    testDropDown = new IntegrationComponent<DropdownComponent, ParentComponent>(
      DropdownComponent,
      ParentComponent
    );
    testDropDown.configure({
      imports: [FontAwesomeModule]
    });
    testDropDown.initialise();
  });

  it("should create", () => {
    expect(testDropDown).toBeTruthy();
  });

  it("should render the label string passed from parent", () => {
    const testString = "test";
    expect(testDropDown.parentElement.textContent).not.toContain(testString);
    testDropDown.setParentProps({
      label: testString
    });
    expect(testDropDown.parentElement.textContent).toContain(testString);
  });

  it("should render the action label string when passed from parent", () => {
    const testString = "test";
    expect(testDropDown.parentElement.textContent).not.toContain(testString);
    testDropDown.setParentProps({
      label: "",
      actionLabel: testString
    });
    testDropDown.setProps({
      isOpen: true
    });
    expect(testDropDown.parentElement.textContent).toContain(testString);
  });
});
