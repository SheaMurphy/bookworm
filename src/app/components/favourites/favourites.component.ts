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
  loading = false;

  constructor(private favouriteService: FavouriteService) {}

  ngOnInit() {
    this.syncFavouritesWithService();
  }

  syncFavouritesWithService() {
    this.loading = true;
    this.favouriteService.getAllBooks().then(favs => {
      this.favourites = favs;
      this.loading = false;
    });
  }

  removeFromFavourites(book: IBook) {
    this.favourites.splice(this.favourites.indexOf(book));
    this.favouriteService.removeBook(book);
  }
}
