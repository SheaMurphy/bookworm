import { DashboardComponent } from "./dashboard.component";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TestComponent } from "@nology/angular-test-simplifier";
import { IBook, mockBooks } from "src/assets/data/book-data";

@Component({ selector: "app-book-list", template: "" })
class StubBookListComponent {
  @Input() books: IBook[];
}

@Component({
  selector: "app-side-panel",
  template:
    "<input class='qa-input' #input (input)='handleSearch.emit(input.value)'><button class='qa-button' (click)='handleResetClick.emit()'></button>"
})
class StubSidePanelComponent {
  @Output() handleSearch = new EventEmitter();
  @Output() handleResetClick = new EventEmitter();
}

describe("DashBoard component tests", () => {
  let testDashboard: TestComponent<DashboardComponent>;

  beforeEach(() => {
    testDashboard = new TestComponent<DashboardComponent>(DashboardComponent);
    testDashboard.configure({
      declarations: [StubBookListComponent, StubSidePanelComponent]
    });
    testDashboard.initialise();
  });

  it("should create", () => {
    expect(testDashboard.instance).toBeTruthy();
  });

  it("should return appropriate filtered list when filterBySearch is called with search text", () => {
    const searchText = mockBooks[0].title;
    const filteredList = testDashboard.instance.filterBySearch(searchText);
    expect(filteredList).toEqual([mockBooks[0]]);
  });

  it("should reset the original book list when removeFilters method is called", () => {
    testDashboard.setProps({
      filteredList: [testDashboard.instance.books[0]]
    });
    testDashboard.instance.removeFilters();
    expect(testDashboard.instance.filteredList).toEqual(
      testDashboard.instance.books
    );

    testDashboard.setProps({
      filteredList: []
    });
    testDashboard.instance.removeFilters();
    expect(testDashboard.instance.filteredList).toEqual(mockBooks);
  });
});

describe("DashBoard and SidePanel component integration tests", () => {
  let testDashboard: TestComponent<DashboardComponent>;

  beforeEach(() => {
    testDashboard = new TestComponent<DashboardComponent>(DashboardComponent);
    testDashboard.configure({
      declarations: [StubBookListComponent, StubSidePanelComponent]
    });
    testDashboard.initialise();
  });

  it("should render one instance of the SidePanelComponent", () => {
    expect(testDashboard.query("app-side-panel")).toBeTruthy();
  });

  it("should call the filterBySearch method when handleSearch event is emitted from side-panel component", () => {
    const spy = testDashboard.spyOn("filterBySearch");
    testDashboard.triggerEvent(".qa-input", "input");
    expect(spy).toHaveBeenCalled();
  });

  it("should set the books property to the correct array after search is input", () => {
    const bookOneTitle = mockBooks[0].title;
    testDashboard.setProps({
      books: mockBooks
    });
    expect(testDashboard.instance.filteredList).toEqual(mockBooks);
    testDashboard.triggerEvent(".qa-input", "input", bookOneTitle);
    testDashboard.fixture.whenStable().then(() => {
      expect(testDashboard.instance.filteredList).toEqual([mockBooks[0]]);
    });
  });

  it("should call the resetFilters method when handleResetClick event is emitted from side-panel component", () => {
    const spy = testDashboard.spyOn("removeFilters");
    testDashboard.triggerEvent(".qa-button", "click");
    expect(spy).toHaveBeenCalled();
  });
});
