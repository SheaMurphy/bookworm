import { BookComponent } from "./book.component";
import { Component } from "@angular/core";
import {
  TestComponent,
  IntegrationComponent
} from "@nology/angular-test-simplifier";
import { emptyIBook, mockBooks } from "src/assets/data/book-data";
import { IBook } from "src/app/services/book/book.service";

@Component({
  template: `
    <app-book
      [book]="book"
      (selectBook)="selectBook($event)"
      (handleHeartClick)="toggleFav()"
      (handleOpenHeartClick)="toggleFav()"
    ></app-book>
  `
})
class ParentComponent {
  book: IBook = emptyIBook;
  selectBook = (input: any) => null;
  toggleFav = () => null;
}

describe("Book component tests", () => {
  let testBook: TestComponent<BookComponent>;

  beforeEach(() => {
    testBook = new TestComponent<BookComponent>(BookComponent);
    testBook.initialise();
  });

  it("should create", () => {
    expect(testBook.instance).toBeTruthy();
  });

  it("should render the cover property as an image", () => {
    testBook.setProps({ cover: "../../../assets/images/book-not-found.png" });
    expect(testBook.query(".qa-cover").getAttribute("src")).toBe(
      "../../../assets/images/book-not-found.png"
    );
  });

  it("getCoverImage() should return the correct cover img based on thumbnail being present", () => {
    const bookWithImages = mockBooks[0];
    let result = testBook.instance.getCoverImage(bookWithImages);
    expect(result).toEqual(bookWithImages.imageLinks.thumbnail);

    const bookWithoutImages = mockBooks[2];
    result = testBook.instance.getCoverImage(bookWithoutImages);
    expect(result).toEqual("../../../assets/images/book-not-found.png");
  });
});

describe("Book component integration tests", () => {
  let testBook: IntegrationComponent<BookComponent, ParentComponent>;

  beforeEach(() => {
    testBook = new IntegrationComponent<BookComponent, ParentComponent>(
      BookComponent,
      ParentComponent
    );
    testBook.initialise();
  });

  it("should take a book data object as input from it's parent component", () => {
    testBook.setParentProps({
      book: mockBooks[0]
    });
    expect(testBook.instance.book).toBe(mockBooks[0]);

    testBook.setParentProps({
      book: mockBooks[1]
    });
    expect(testBook.instance.book).toBe(mockBooks[1]);
  });

  it("should show open heart image when not a favourite", () => {
    const notFavBook = mockBooks[1];

    testBook.setParentProps({
      book: notFavBook
    });

    expect(
      testBook.query("img[src='../../../assets/images/heart-open.png']")
    ).toBeTruthy();
  });

  it("should show closed heart image when book is a favourite", () => {
    const favBook = mockBooks[0];

    testBook.setParentProps({
      book: favBook
    });

    expect(
      testBook.query("img[src='../../../assets/images/heart-closed.png']")
    ).toBeTruthy();
  });

  it("should render the IBook title when there is no IBook imageLinks object", () => {
    const bookWithImages = mockBooks[0];
    const bookWithoutImages = mockBooks[2];

    testBook.setParentProps({
      book: bookWithImages
    });
    expect(testBook.parentElement.textContent).not.toContain(
      bookWithImages.title
    );

    testBook.setParentProps({
      book: bookWithoutImages
    });
    expect(testBook.parentElement.textContent).toContain(
      bookWithoutImages.title
    );
  });

  it("should call parent function when component is clicked", () => {
    const spy = spyOn(testBook.parentInstance, "selectBook");
    testBook.triggerEvent("article", "click");
    expect(spy).toHaveBeenCalled();
  });

  it("should call parent function with book as argument when component is clicked", () => {
    testBook.setParentProps({
      book: mockBooks[0]
    });
    const spy = spyOn(testBook.parentInstance, "selectBook");
    testBook.triggerEvent("article", "click");
    expect(spy).toHaveBeenCalledWith(mockBooks[0]);
  });

  it("should call a parent function when the heart images are clicked", () => {
    testBook.setParentProps({
      book: mockBooks[0]
    });
    const spy = spyOn(testBook.parentInstance, "toggleFav");
    testBook.triggerEvent(".heart", "click");
    expect(spy).toHaveBeenCalled();
    testBook.setParentProps({
      book: mockBooks[0]
    });
    testBook.triggerEvent(".heart", "click");
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("should not call parent function linked to main component click when heart image is clicked ", () => {
    testBook.setParentProps({
      book: mockBooks[0]
    });
    const spy = spyOn(testBook.parentInstance, "selectBook");
    testBook.triggerEvent(".heart", "click");
    expect(spy).not.toHaveBeenCalled();
  });

  it("should call parent function linked to favourite click when heart image is clicked ", () => {
    testBook.setParentProps({
      book: mockBooks[0]
    });
    const spy = spyOn(testBook.parentInstance, "toggleFav");
    testBook.triggerEvent(".heart", "click");
    expect(spy).toHaveBeenCalled();
  });
});
