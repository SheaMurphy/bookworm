import { Component, OnInit } from "@angular/core";
import { FavouriteService } from "src/app/services/favourite/favourite.service";
import { IBook } from "src/app/services/book/book.service";

@Component({
  selector: "app-favourites",
  templateUrl: "./favourites.component.html",
  styleUrls: ["./favourites.component.scss"]
})
export class FavouritesComponent implements OnInit {
  favourites: IBook[] = [];

  constructor(private favouriteService: FavouriteService) {}

  ngOnInit() {
    this.favouriteService.getAllBooks().then(data => (this.favourites = data));
  }

  removeFromFavourites(book: IBook) {
    this.favouriteService
      .removeBook(book)
      .then((favs: IBook[]) => (this.favourites = favs));
  }
}
