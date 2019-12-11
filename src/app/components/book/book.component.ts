import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { emptyIBook } from "src/assets/data/book-data";
import { IBook } from "src/app/services/book/book.service";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"]
})
export class BookComponent implements OnInit {
  @Input() book: IBook = emptyIBook;
  @Output() handleHeartClick = new EventEmitter();
  @Output() handleOpenHeartClick = new EventEmitter();
  @Output() selectBook = new EventEmitter();

  favourite: boolean;
  cover = "";

  ngOnInit() {
    this.cover = this.getCoverImage(this.book);
  }

  getCoverImage(book: IBook) {
    return book.imageLinks
      ? book.imageLinks.thumbnail
      : "../../../assets/images/book-not-found.png";
  }

  handleClick(heartState: string, event: Event) {
    event.stopPropagation();
    this.book.favourite = !this.book.favourite;
    heartState === "open"
      ? this.handleOpenHeartClick.emit(this.book)
      : this.handleHeartClick.emit(this.book);
  }
}
