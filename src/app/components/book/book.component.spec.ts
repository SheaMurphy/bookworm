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
  let book: TestComponent<BookComponent>;

  beforeEach(() => {
    book = new TestComponent<BookComponent>(BookComponent);
    book.initialise();
  });

  it("should create", () => {
    expect(book.instance).toBeTruthy();
  });

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

  it("should show open heart image when not a favourite", () => {
    const notFavBook = mockBooks[1];

    book.setParentProps({
      book: notFavBook
    });

    expect(
      book.query("img[src='../../../assets/images/heart-open.png']")
    ).toBeTruthy();
  });

  it("should show closed heart image when book is a favourite", () => {
    const favBook = mockBooks[0];

    book.setParentProps({
      book: favBook
    });

    expect(
      book.query("img[src='../../../assets/images/heart-closed.png']")
    ).toBeTruthy();
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

  it("should call parent function when component is clicked", () => {
    const spy = spyOn(book.parentInstance, "selectBook");
    book.triggerEvent("article", "click");
    expect(spy).toHaveBeenCalled();
  });

  it("should call parent function with book as argument when component is clicked", () => {
    book.setParentProps({
      book: mockBooks[0]
    });
    const spy = spyOn(book.parentInstance, "selectBook");
    book.triggerEvent("article", "click");
    expect(spy).toHaveBeenCalledWith(mockBooks[0]);
  });

  it("should call a parent function when the heart images are clicked", () => {
    book.setParentProps({
      book: mockBooks[0]
    });
    const spy = spyOn(book.parentInstance, "toggleFav");
    book.triggerEvent(".heart", "click");
    expect(spy).toHaveBeenCalled();
    book.setParentProps({
      book: mockBooks[0]
    });
    book.triggerEvent(".heart", "click");
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("should not call parent function linked to main component click when heart image is clicked ", () => {
    book.setParentProps({
      book: mockBooks[0]
    });
    const spy = spyOn(book.parentInstance, "selectBook");
    book.triggerEvent(".heart", "click");
    expect(spy).not.toHaveBeenCalled();
  });

  it("should call parent function linked to favourite click when heart image is clicked ", () => {
    book.setParentProps({
      book: mockBooks[0]
    });
    const spy = spyOn(book.parentInstance, "toggleFav");
    book.triggerEvent(".heart", "click");
    expect(spy).toHaveBeenCalled();
  });
});
