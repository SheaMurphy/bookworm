import { Component } from "@angular/core";
import { faHeart, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { BookService } from "src/app/services/book/book.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  faHeart: IconDefinition | string = faHeart;

  constructor(private bookService: BookService) {}

  searchAuthor(author: string) {
    this.bookService.setAuthor(author);
  }
}
