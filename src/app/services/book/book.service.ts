import { IVolumeInfo } from "./book.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { FavouriteService } from "../favourite/favourite.service";

export interface IResponse {
  kind: string;
  totalItems: number;
  items: IBookData[];
}

export interface IBookData {
  id: string;
  saleInfo: {
    buyLink: string;
  };
  volumeInfo: IVolumeInfo;
}

export interface IVolumeInfo {
  title: string;
  publishedDate: string;
  description: string;
  favourite?: boolean;
  categories?: string[];
  pageCount: number;
  imageLinks?: {
    thumbnail: string;
    smallThumbnail: string;
  };
}

export interface IBook extends IVolumeInfo {
  id: string;
}

@Injectable({
  providedIn: "root"
})
export class BookService {
  author: Subject<string>;
  selectedBook: Subject<IBook | null>;

  constructor(
    private httpClient: HttpClient,
    private favouriteService: FavouriteService
  ) {
    this.author = new Subject();
    this.selectedBook = new Subject();
  }

  fetchBooks(author: string): any {
    return this.httpClient
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=inauthor:" +
          author +
          "&maxResults=40&key:" +
          "AIzaSyBzAhdlRZ9hd3aOVRKTUzZW9KX06ncoimM"
      )
      .toPromise()
      .then((res: IResponse): IBook[] => {
        const books = res.items.map(item => {
          const { volumeInfo, id } = item;
          const {
            title,
            imageLinks,
            categories,
            pageCount,
            description,
            publishedDate
          } = volumeInfo;
          return {
            id,
            title,
            imageLinks,
            categories,
            pageCount,
            description,
            publishedDate
          };
        });
        return books;
      })
      .catch((err: Error) => {
        console.log(err);
        throw err;
      });
  }

  getGenres(books: IBook[]): string[] {
    const genreList = new Set();
    books.forEach(book => book.categories && genreList.add(book.categories[0]));
    return Array.from(genreList).splice(0, 7);
  }

  getPageCount(books: IBook[]) {
    let topPageCount = 0;
    books.forEach(book => {
      const pages = book.pageCount;
      if (pages > topPageCount) {
        topPageCount = pages;
      }
    });
    return topPageCount;
  }

  setAuthor(author: string): void {
    this.author.next(author);
  }

  setSelectedBook(book: IBook) {
    this.selectedBook.next(book);
  }
}
