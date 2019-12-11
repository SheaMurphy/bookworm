import { FormsModule } from "@angular/forms";
import { SidePanelComponent } from "./side-panel.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  TestComponent,
  IntegrationComponent
} from "@nology/angular-test-simplifier";
import { Component, Input } from "@angular/core";

@Component({
  template: `
    <app-side-panel
      (handleResetClick)="testEmitter()"
      (handleSearch)="testEmitter($event)"
    ></app-side-panel>
  `
})
class ParentComponent {
  testEmitter(search: string) {
    return search;
  }
}

@Component({ selector: "app-dropdown", template: "" })
class StubDropdownComponent {
  @Input() label: string;
}

@Component({ selector: "app-slider", template: "" })
class StubSliderComponent {
  @Input() min: string;
  @Input() max: string;
  @Input() value: string;
}

describe("SidePanelComponent", () => {
  let testSidePanel: TestComponent<SidePanelComponent>;

  beforeEach(() => {
    testSidePanel = new TestComponent<SidePanelComponent>(SidePanelComponent);
    testSidePanel.configure({
      declarations: [StubDropdownComponent, StubSliderComponent],
      imports: [FontAwesomeModule, FormsModule]
    });
    testSidePanel.initialise();
  });

  it("should create", () => {
    expect(testSidePanel).toBeTruthy();
  });

  it("should render at least one instance of the Slider component", () => {
    expect(testSidePanel.query("app-slider")).toBeTruthy();
  });

  it("should render at least one instance of the DropDown component", () => {
    expect(testSidePanel.query("app-dropdown")).toBeTruthy();
  });

  it("should add the hidden class when the menuOpen property === false", () => {
    testSidePanel.setProps({
      menuOpen: false
    });
    expect(testSidePanel.query(".hide")).toBeTruthy();

    testSidePanel.setProps({
      menuOpen: true
    });
    expect(testSidePanel.query(".hide")).toBeFalsy();
  });

  it("should call the handleMenuClick method when the h2 element is clicked", () => {
    const spy = testSidePanel.spyOn("handleMenuClick");
    expect(spy).toHaveBeenCalledTimes(0);
    testSidePanel.triggerEvent("h2", "click");

    testSidePanel.fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it("should toggle the menuOpen property when handleMenuClick method is called", () => {
    testSidePanel.setProps({
      menuOpen: false
    });

    testSidePanel.instance.handleMenuClick();
    expect(testSidePanel.instance.menuOpen).toBe(true);

    testSidePanel.instance.handleMenuClick();
    expect(testSidePanel.instance.menuOpen).toBe(false);
  });

  it("should have an input element", () => {
    testSidePanel.fixture.whenStable().then(() => {
      expect(testSidePanel.queryAll("input").length).toEqual(1);
    });
  });

  it("should render one instance of the dropdown component", () => {
    testSidePanel.fixture.whenStable().then(() => {
      expect(testSidePanel.queryAll("app-dropdown").length).toEqual(1);
    });
  });
});

describe("Side panel integration tests", () => {
  let testSidePanel: IntegrationComponent<SidePanelComponent, ParentComponent>;

  beforeEach(() => {
    testSidePanel = new IntegrationComponent<
      SidePanelComponent,
      ParentComponent
    >(SidePanelComponent, ParentComponent);
    testSidePanel.configure({
      declarations: [StubDropdownComponent, StubSliderComponent],
      imports: [FontAwesomeModule, FormsModule]
    });
    testSidePanel.initialise();
  });

  it("should emit event and call parent component function on input event", () => {
    const spy = spyOn(testSidePanel.parentInstance, "testEmitter");
    testSidePanel.triggerEvent("input", "input");
    expect(spy).toHaveBeenCalled();
  });

  it("should call parent function with vale from input event", () => {
    const spy = spyOn(testSidePanel.parentInstance, "testEmitter");
    testSidePanel.triggerEvent("input", "input");
    expect(spy).toHaveBeenCalled();
  });

  it("should call parent component function on click of button", () => {
    const spy = spyOn(testSidePanel.parentInstance, "testEmitter");
    testSidePanel.triggerEvent("button", "click");
    expect(spy).toHaveBeenCalled();
  });

  it("should emit event and call parent component function when resetFilters method is called", () => {
    const spy = spyOn(testSidePanel.parentInstance, "testEmitter");
    testSidePanel.instance.resetFilters();
    expect(spy).toHaveBeenCalled();
  });
});
