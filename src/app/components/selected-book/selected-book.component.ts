import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { IBook } from "src/app/services/book/book.service";

@Component({
  selector: "app-selected-book",
  templateUrl: "./selected-book.component.html",
  styleUrls: ["./selected-book.component.scss"]
})
export class SelectedBookComponent implements OnInit {
  @Input() book: IBook;
  @Output() closePanel = new EventEmitter();
  @Output() addToFavourites = new EventEmitter();
  @Output() removeFromFavourites = new EventEmitter();

  favImg: string;
  shortDescription: string;
  faTimes = faTimes;
  heartClosed = "../../../assets/images/heart-closed.png";
  heartOpen = "../../../assets/images/heart-open.png";

  ngOnInit() {
    this.favImg = this.book.favourite ? this.heartClosed : this.heartOpen;
    this.shortDescription = this.shortenDescription(this.book.description);
  }

  shortenDescription(description: string): string {
    return description.length < 400
      ? description
      : description.substring(0, 400) + "...";
  }

  toggleFav() {
    this.favImg === this.heartClosed
      ? (this.favImg = this.heartOpen)
      : (this.favImg = this.heartClosed);
    const isFavourite = this.book.favourite;
    this.book.favourite = !isFavourite;
    this.book.favourite
      ? this.addToFavourites.emit(this.book)
      : this.removeFromFavourites.emit(this.book);
  }
}
