import { SearchBarComponent } from "./search-bar.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  TestComponent,
  IntegrationComponent
} from "@nology/angular-test-simplifier";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FormsModule } from "@angular/forms";
import { Component } from "@angular/core";

@Component({
  template: `
    <app-search-bar (handleSearch)="testEmitter($event)"></app-search-bar>
  `
})
class ParentComponent {
  testEmitter(searchText: string) {
    return searchText;
  }
}

describe("Search bar component tests", () => {
  let testSearchBar: TestComponent<SearchBarComponent>;
  beforeEach(() => {
    testSearchBar = new TestComponent<SearchBarComponent>(SearchBarComponent);
    testSearchBar.configure({ imports: [FontAwesomeModule, FormsModule] });
    testSearchBar.initialise();
  });

  it("should create", () => {
    expect(testSearchBar).toBeTruthy();
  });

  it("should render an input element with type text", () => {
    expect(testSearchBar.query("input[type='text']")).toBeTruthy();
  });

  it("should render the placeholder property as the input SearchBar's placeholder attribute attribute", () => {
    testSearchBar.setProps({
      placeholder: "Test string"
    });
    const iconElem = testSearchBar.query("input");
    expect(iconElem.getAttribute("placeholder")).toBe("Test string");
  });

  it("should render the faSearch property as the Font Awesome icon attribute", () => {
    testSearchBar.setProps({
      faSearch
    });
    const iconElem = testSearchBar.query("fa-icon .fa-search");
    expect(iconElem).toBeTruthy();
  });

  it("should update the searchText property on input", () => {
    testSearchBar.setProps({
      searchText: ""
    });
    testSearchBar.triggerEvent("input", "input", "Test string");
    expect(testSearchBar.instance.searchText).toEqual("Test string");
  });

  it("should set the input field's value equal to the searchText property", () => {
    testSearchBar.setProps({
      searchText: "Test string"
    });
    const inputElem: HTMLInputElement = testSearchBar.query("input");

    testSearchBar.fixture.whenStable().then(() => {
      expect(inputElem.value).toBe("Test string");
    });
  });
});

describe("Search bar integration tests", () => {
  let testSearchBar: IntegrationComponent<SearchBarComponent, ParentComponent>;

  beforeEach(() => {
    testSearchBar = new IntegrationComponent<
      SearchBarComponent,
      ParentComponent
    >(SearchBarComponent, ParentComponent);
    testSearchBar.configure({
      imports: [FontAwesomeModule, FormsModule]
    });
    testSearchBar.initialise();
  });

  it("should call parent component function when handleSearch event is emitted", () => {
    const spy = spyOn(testSearchBar.parentInstance, "testEmitter");
    testSearchBar.triggerEvent("input", "input");
    expect(spy).toHaveBeenCalled();
  });

  it("should call parent function with input value when event is emitted", () => {
    const spy = spyOn(testSearchBar.parentInstance, "testEmitter");
    testSearchBar.triggerEvent("input", "input", "Test string");
    expect(spy).toHaveBeenCalledWith("Test string");
  });
});
