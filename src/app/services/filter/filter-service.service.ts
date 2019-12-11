import { Injectable } from "@angular/core";
import { IFilters } from "src/app/components/dashboard/dashboard.component";
import { IBook } from "../book/book.service";

@Injectable({
  providedIn: "root"
})
export class FilterServiceService {
  constructor() {}

  filterBooks(books: IBook[], filters: IFilters) {
    let filteredBooks: IBook[];
    filteredBooks = this.filterByGenre(books, filters.genre);
    filteredBooks = this.filterByKeyword(filteredBooks, filters.searchText);
    filteredBooks = this.filterByPageCount(filteredBooks, filters.pageCount);
    return filteredBooks;
  }

  filterByGenre(books: IBook[], genre: string) {
    return genre
      ? books.filter(book => {
          return book.categories && book.categories.includes(genre);
        })
      : books;
  }

  filterByKeyword(books: IBook[], keyword: string) {
    return keyword
      ? books.filter(book => {
          const descContains =
            book.description &&
            book.description.toLowerCase().includes(keyword);
          const titleContains =
            book.title && book.title.toLowerCase().includes(keyword);
          return descContains && titleContains;
        })
      : books;
  }

  filterByPageCount(books: IBook[], pageCount: number) {
    return pageCount
      ? books.filter(book => {
          return book.pageCount && book.pageCount <= pageCount;
        })
      : books;
  }
}
