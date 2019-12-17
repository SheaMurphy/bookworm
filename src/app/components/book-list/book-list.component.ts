import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IBook } from "src/app/services/book/book.service";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"]
})
export class BookListComponent {
  @Input() books: IBook[] = [];
  @Output() addToFavourites = new EventEmitter();
  @Output() removeFromFavourites = new EventEmitter();
  @Output() selectBook = new EventEmitter();
}
