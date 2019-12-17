import { mockBooks } from "src/assets/data/book-data";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { BookListComponent } from "./book-list.component";
import {
  TestComponent,
  IntegrationComponent
} from "@nology/angular-test-simplifier";
import { IBook } from "src/app/services/book/book.service";

@Component({
  selector: "app-book",
  template: ""
})
class StubBookComponent {
  @Input() book: IBook;
}

@Component({
  template: `
    <app-book-list
      [books]="books"
      (addToFavourites)="testFunc($event)"
      (removeFromFavourites)="testFunc($event)"
      (selectBook)="testFunc($event)"
    ></app-book-list>
  `
})
class ParentComponent {
  books: IBook[] = [];
  testFunc = (input: any) => null;
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

  // it("should call parent function with appropriate book as argument when a book is clicked", () => {
  //   testBookList.setParentProps({
  //     books: [mockBooks[0]]
  //   });
  //   const spy = spyOn(testBookList.parentInstance, "testFunc");
  //   testBookList.triggerEvent("app-book", "click");
  //   expect(spy).toHaveBeenCalled();
  // });
});
