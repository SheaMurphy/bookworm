import { SliderComponent } from "./slider.component";
import {
  TestComponent,
  IntegrationComponent
} from "@nology/angular-test-simplifier";
import { Component } from "@angular/core";

@Component({
  template: `
    <app-slider [min]="min" [max]="max" [value]="value"></app-slider>
  `
})
class ParentComponent {
  min: string;
  max: string;
  value: string;
}

describe("Slider component tests", () => {
  let testSlider: TestComponent<SliderComponent>;

  beforeEach(() => {
    testSlider = new TestComponent<SliderComponent>(SliderComponent);
    testSlider.initialise();
  });

  it("should create", () => {
    expect(testSlider).toBeTruthy();
  });

  it("should render an input element with type range", () => {
    expect(testSlider.query("input[type='range']")).toBeTruthy();
  });

  it("should render the min, max and value properties from the .ts on the page", () => {
    testSlider.setProps({
      min: 0,
      max: 9,
      value: 12
    });

    const { textContent } = testSlider.element;

    expect(textContent).toContain("0");
    expect(textContent).toContain("9");
    expect(textContent).toContain("12");
  });

  it("should render the max property as the value for input element's max attribute", () => {
    testSlider.setProps({
      max: 42
    });
    const inputElem = testSlider.query("input");
    expect(inputElem.getAttribute("max")).toBe("42");
  });

  it("should render the min property as the value for input element's min attribute", () => {
    testSlider.setProps({
      min: 42
    });
    const inputElem = testSlider.query("input");
    expect(inputElem.getAttribute("min")).toBe("42");
  });

  it("should call the handleValueChange method on input event", () => {
    const spy = testSlider.spyOn("handleValueChange");

    testSlider.triggerEvent("input", "input", "42");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("42");
  });

  // it("should assign correct numeric value on handleValueChange method call ", () => {
  //   expect(testSlider.instance.value).toBe(0);

  //   testSlider.instance.handleValueChange("42");
  //   expect(testSlider.instance.value).toBe(42);

  //   testSlider.instance.handleValueChange("4");
  //   expect(testSlider.instance.value).toBe(4);
  // });

  // it("should assign 0 on handleValueChange method call with empty string", () => {
  //   expect(testSlider.instance.value).toBe(0);
  //   testSlider.instance.value = 42;

  //   testSlider.instance.handleValueChange("");
  //   expect(testSlider.instance.value).toBe(0);
  // });

  // it("should update the value property to input value on input event", () => {
  //   const input: HTMLInputElement = testSlider.query("input");

  //   testSlider.setProps({
  //     value: 42
  //   });
  //   input.dispatchEvent(new Event("input"));

  //   expect(testSlider.instance.value).toBe(42);
  // });
});

describe("Slider component integration tests", () => {
  let testSlider: IntegrationComponent<SliderComponent, ParentComponent>;

  beforeEach(() => {
    testSlider = new IntegrationComponent<SliderComponent, ParentComponent>(
      SliderComponent,
      ParentComponent
    );
    testSlider.initialise();
  });

  it("should take min, max and value numeric values as inputs", () => {
    testSlider.setParentProps({
      min: 0,
      max: 999,
      value: 500
    });
    expect(testSlider.instance.min).toBe(0);
    expect(testSlider.instance.max).toBe(999);
    expect(testSlider.instance.value).toBe(500);

    testSlider.setParentProps({
      min: 20,
      max: 100,
      value: 60
    });
    expect(testSlider.instance.min).toBe(20);
    expect(testSlider.instance.max).toBe(100);
    expect(testSlider.instance.value).toBe(60);
  });
});
