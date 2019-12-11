import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { HeaderComponent } from "./header.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { TestComponent } from "@nology/angular-test-simplifier";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule } from "@angular/forms";
import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-search-bar",
  template:
    "<input class='qa-input' #input (input)='handleSearch.emit(input.value)' />"
})
class StubSearchBarComponent {
  @Output() handleSearch = new EventEmitter();
}

describe("HeaderComponent", () => {
  let testHeader: TestComponent<HeaderComponent>;

  beforeEach(() => {
    testHeader = new TestComponent<HeaderComponent>(HeaderComponent);
    testHeader.configure({
      declarations: [StubSearchBarComponent],
      imports: [FontAwesomeModule, FormsModule]
    });
    testHeader.initialise();
  });

  it("should create", () => {
    expect(testHeader).toBeTruthy();
  });

  it("should render a header element", () => {
    expect(testHeader.query("header")).toBeTruthy();
  });

  it("should render on instance of the FontAwesome component", () => {
    expect(testHeader.query("fa-icon")).toBeTruthy();
  });

  it("should render the faHeart property as the FontAwesome icon attribute", () => {
    testHeader.setProps({
      faHeart
    });
    const iconElem = testHeader.query("fa-icon .fa-heart");
    expect(iconElem).toBeTruthy();
  });

  it("should add the active class to the .fa-wrap element when isActive property === true", () => {
    testHeader.setProps({
      isActive: false
    });
    expect(testHeader.query(".active")).toBeFalsy();

    testHeader.setProps({
      isActive: true
    });
    expect(testHeader.query(".active")).toBeTruthy();
  });

  it("should call the handleFavClick method when the qa-click element is clicked", () => {
    const spy = testHeader.spyOn("handleFavClick");
    expect(spy).toHaveBeenCalledTimes(0);

    testHeader.triggerEvent(".qa-click", "click");

    testHeader.fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it("should toggle the isActive property when handleFavClick method is called", () => {
    testHeader.setProps({
      isActive: false
    });

    testHeader.instance.handleFavClick();
    expect(testHeader.instance.isActive).toEqual(true);

    testHeader.instance.handleFavClick();
    expect(testHeader.instance.isActive).toEqual(false);
  });

  it("should update the h1 text when updateSearchText is called", () => {
    testHeader.setProps({
      searchText: "Test string"
    });
    expect(testHeader.query("h1").textContent).toEqual("Test string");

    testHeader.instance.updateSearchText("Updated string");
    testHeader.updateFixture();
    expect(testHeader.query("h1").textContent).toEqual("Updated string");
  });
});

describe("HeaderComponent and SearchBarComponent integration tests", () => {
  let testHeader: TestComponent<HeaderComponent>;

  beforeEach(() => {
    testHeader = new TestComponent<HeaderComponent>(HeaderComponent);
    testHeader.configure({
      declarations: [StubSearchBarComponent],
      imports: [FontAwesomeModule, FormsModule]
    });
    testHeader.initialise();
  });

  it("should render one instance of the SearchBar component", () => {
    expect(testHeader.query("app-search-bar")).toBeTruthy();
  });

  it("should update the h1 text to the value emitted from the SearchBarComponent", () => {
    testHeader.setProps({
      searchText: "Test string"
    });
    expect(testHeader.query("h1").textContent).toEqual("Test string");

    testHeader.triggerEvent(".qa-input", "input", "Updated string");
    expect(testHeader.query("h1").textContent).toEqual("Updated string");
  });

  it("should call the updateSearchText method when event is emitted from SearchBar component", () => {
    const spy = testHeader.spyOn("updateSearchText");
    testHeader.triggerEvent(".qa-input", "input", "Updated string");
    expect(spy).toHaveBeenCalled();
  });
});
