import { BookComponent } from "./book.component";
import { Component } from "@angular/core";
import {
  TestComponent,
  IntegrationComponent
} from "@nology/angular-test-simplifier";
import { emptyIBook, IBook, mockBooks } from "src/assets/data/book-data";

@Component({
  template: `
    <app-book [book]="book"></app-book>
  `
})
class ParentComponent {
  book: IBook = emptyIBook;
}

describe("Book component tests", () => {
  let book: TestComponent<BookComponent>;

  beforeEach(() => {
    book = new TestComponent<BookComponent>(BookComponent);
    book.initialise();
  });

  it("should create", () => {
    expect(book.instance).toBeTruthy();
  });

  it("should render one image element using the open-heart asset", () => {
    expect(
      book.query("img[src='../../../assets/images/heart-open.png']")
    ).toBeTruthy();
  });

  // it("should render title from variable in .ts", () => {
  //   book.setProps({ title: "Test string" });
  //   expect(book.element.textContent).toContain("Test string");
  // });

  it("should render the cover property as an image", () => {
    book.setProps({ cover: "../../../assets/images/book-not-found.png" });
    expect(book.query(".qa-cover").getAttribute("src")).toBe(
      "../../../assets/images/book-not-found.png"
    );
  });

  it("getCoverImage() should return the correct cover img based on thumbnail being present", () => {
    const bookWithImages = mockBooks[0];
    let result = book.instance.getCoverImage(bookWithImages);
    expect(result).toEqual(bookWithImages.imageLinks.thumbnail);

    const bookWithoutImages = mockBooks[2];
    result = book.instance.getCoverImage(bookWithoutImages);
    expect(result).toEqual("../../../assets/images/book-not-found.png");
  });
});

describe("Book component integration tests", () => {
  let book: IntegrationComponent<BookComponent, ParentComponent>;

  beforeEach(() => {
    book = new IntegrationComponent<BookComponent, ParentComponent>(
      BookComponent,
      ParentComponent
    );
    book.initialise();
  });

  it("should take a book data object as input from it's parent component", () => {
    book.setParentProps({
      book: mockBooks[0]
    });
    expect(book.instance.book).toBe(mockBooks[0]);

    book.setParentProps({
      book: mockBooks[1]
    });
    expect(book.instance.book).toBe(mockBooks[1]);
  });

  it("should take a book data object as input from it's parent component", () => {
    book.setParentProps({
      book: mockBooks[0]
    });
    expect(book.instance.book).toBe(mockBooks[0]);

    book.setParentProps({
      book: mockBooks[1]
    });
    expect(book.instance.book).toBe(mockBooks[1]);
  });

  it("should render the IBook title when there is no IBook imageLinks object", () => {
    const bookWithImages = mockBooks[0];
    const bookWithoutImages = mockBooks[2];

    book.setParentProps({
      book: bookWithImages
    });
    expect(book.parentElement.textContent).not.toContain(bookWithImages.title);

    book.setParentProps({
      book: bookWithoutImages
    });
    expect(book.parentElement.textContent).toContain(bookWithoutImages.title);
  });
});
