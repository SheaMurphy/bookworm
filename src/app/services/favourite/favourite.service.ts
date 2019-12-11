import { Injectable } from "@angular/core";
import { mockBooks } from "src/assets/data/book-data";
import { IBook } from "../book/book.service";
import { HttpClient } from "@angular/common/http";

interface IEntityBook {
  googleId: string;
  description: string;
  title: string;
  image: string;
  imageSmall: string;
  pageCount: number;
  publishedDate: string;
}

const mockEntityBooks: IEntityBook[] = [
  {
    title: "Watermelon",
    description:
      "Gordon Comstock loathes dull, middle-class respectability and worship of money. He gives up a 'good job' in advertising to work part-time in a bookshop, giving him more time to write. But he slides instead into a self-induced poverty that destroys his creativity and his spirit. Only Rosemary, ever-faithful Rosemary, has the strength to challenge his commitment to his chosen way of life. Through the character of Gordon Comstock, Orwell reveals his own disaffection with the society he once himself renounced.",
    publishedDate: "2010",
    pageCount: 119,
    googleId: "RMb4Et3FgN4C",
    imageSmall:
      "http://books.google.com/books/content?id=RMb4Et3FgN4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    image:
      "http://books.google.com/books/content?id=RMb4Et3FgN4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  }
];

@Injectable({
  providedIn: "root"
})
export class FavouriteService {
  favourites: IBook[] = [];

  constructor(private httpClient: HttpClient) {}

  getAllBooks(): Promise<IBook[]> {
    return this.httpClient
      .get("http://localhost:8090/api/books")
      .toPromise()
      .then((favs: IEntityBook[]) => {
        const books = favs.map(this.mapEntityToIBook);
        return books;
      });
  }

  getBookById(searchId: string): Promise<IBook> {
    return this.httpClient
      .get("http://localhost:8090/api/books/" + searchId)
      .toPromise()
      .then((fav: IEntityBook) => {
        return this.mapEntityToIBook(fav);
      });
  }

  addBook(book: IBook): Promise<any> {
    return this.httpClient
      .post<IBook>(
        "http://localhost:8090/api/books",
        this.mapIBookToEntity(book)
      )
      .toPromise()
      .then(res => res);
  }

  removeBook(book: IBook): Promise<void | IBook[]> {
    return this.httpClient
      .delete(`http://localhost:8090/api/books/'${book.id}'`)
      .toPromise()
      .then((res: IEntityBook) => {
        return this.getAllBooks();
      })
      .catch(err => {
        console.log(err);
      });
  }

  checkIfFavourite(id: string): boolean {
    return (
      this.favourites.filter((favourite: IBook) => favourite.id === id).length >
      0
    );
  }

  mapEntityToIBook(entityBook: IEntityBook): IBook {
    const {
      title,
      description,
      googleId,
      pageCount,
      publishedDate,
      image,
      imageSmall
    } = entityBook;

    const mappedIBook: IBook = {
      title,
      description,
      publishedDate,
      pageCount,
      id: googleId,
      imageLinks: {
        thumbnail: image,
        smallThumbnail: imageSmall
      },
      favourite: true
    };
    return mappedIBook;
  }

  mapIBookToEntity(book: IBook): IEntityBook {
    const {
      id,
      title,
      description,
      pageCount,
      publishedDate,
      imageLinks
    } = book;

    const mappedEntityBook = {
      googleId: id,
      image: imageLinks.thumbnail,
      imageSmall: imageLinks.smallThumbnail,
      title,
      description,
      pageCount,
      publishedDate
    };
    return mappedEntityBook;
  }
}
