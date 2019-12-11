import { FilterServiceService } from "./../../services/filter/filter-service.service";
import { Component, OnInit } from "@angular/core";
import { BookService, IBook } from "src/app/services/book/book.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { FavouriteService } from "src/app/services/favourite/favourite.service";

export interface IFilters {
  pageCount: number;
  genre: string;
  searchText: string;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  books: IBook[] = [];
  filteredList: IBook[] = this.books;
  subscriptions: Subscription[] = [];
  currentAuthor: string;
  selectedBook: IBook;
  loading = false;
  timer;
  filters: IFilters;
  genres: string[];
  maxPages: number = 0;

  constructor(
    private bookService: BookService,
    private favouriteService: FavouriteService,
    private filterServiceService: FilterServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.bookService.author.subscribe(author => {
        this.getBooks(author);
      }),
      this.bookService.selectedBook.subscribe(selectedBook => {
        this.selectedBook = selectedBook;
      })
    );
  }

  toggleFavStatus(book: IBook) {
    this.favouriteService.addBook(book);
    this.router.navigate(["/favourites"]);
  }

  getBooks(author: string): void {
    this.loading = true;
    clearTimeout(this.timer);

    this.bookService.fetchBooks(author).then((res: IBook[]) => {
      this.books = res.map((book: IBook) => {
        book.favourite = this.favouriteService.checkIfFavourite(book.id);
        return book;
      });
      this.initialiseValues(this.books);
      this.filteredList = this.books;
      this.timer = setTimeout(() => {
        this.loading = false;
      }, 600);
    });
  }

  setSelectedBook(book: IBook) {
    this.bookService.setSelectedBook(book);
  }

  filterBooks(filters: IFilters) {
    this.filters = filters;
    return this.filterServiceService.filterBooks(this.books, filters);
  }

  initialiseValues(books: IBook[]) {
    this.genres = this.bookService.getGenres(books);
    this.maxPages = this.bookService.getPageCount(books);
  }

  addToFavourites(book: IBook) {
    this.favouriteService.addBook(book);
  }

  removeFromFavourites(book: IBook) {
    this.favouriteService.removeBook(book);
  }

  closeSelectedPanel() {
    this.bookService.setSelectedBook(null);
  }
}
