import { mockBooks, IBook } from "src/assets/data/book-data";
import { Component, Input } from "@angular/core";
import { BookListComponent } from "./book-list.component";
import {
  TestComponent,
  IntegrationComponent
} from "@nology/angular-test-simplifier";

@Component({ selector: "app-book", template: "" })
class StubBookComponent {
  @Input() book: IBook;
}

@Component({
  template: `
    <app-book-list [books]="books"></app-book-list>
  `
})
class ParentComponent {
  books: IBook[] = [];
}

describe("BookListComponent", () => {
  let testBookList: TestComponent<BookListComponent>;

  beforeEach(() => {
    testBookList = new TestComponent<BookListComponent>(BookListComponent);
    testBookList.configure({ declarations: [StubBookComponent] });
    testBookList.initialise();
  });

  it("should create", () => {
    expect(testBookList.instance).toBeTruthy();
  });

  // it("should render at least one instance of the book component", () => {
  //   expect(testBookList.query("app-book")).toBeTruthy();
  // });
});

describe("BookList component integration tests", () => {
  let testBookList: IntegrationComponent<BookListComponent, ParentComponent>;

  beforeEach(() => {
    testBookList = new IntegrationComponent<BookListComponent, ParentComponent>(
      BookListComponent,
      ParentComponent
    );
    testBookList.configure({ declarations: [StubBookComponent] });
    testBookList.initialise();
  });

  it("should render the correct number of book components", () => {
    testBookList.setParentProps({
      books: mockBooks
    });

    testBookList.fixture.whenStable().then(() => {
      expect(testBookList.queryAll("app-book").length).toEqual(
        mockBooks.length
      );
    });

    testBookList.setParentProps({
      books: []
    });

    testBookList.fixture.whenStable().then(() => {
      expect(testBookList.queryAll("app-book").length).toEqual(0);
    });
  });

  it("should conditionally render the user feedback paragraph when booksPresent property is false", () => {
    testBookList.setParentProps({
      books: [mockBooks[0]]
    });
    expect(testBookList.query(".qa-feedback")).toBeFalsy();

    testBookList.setParentProps({
      books: []
    });
    expect(testBookList.query(".qa-feedback")).toBeTruthy();
  });
});
