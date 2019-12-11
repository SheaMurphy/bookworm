import { Component, Output, EventEmitter, Input } from "@angular/core";
import { faSearch, IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent {
  @Output() handleSearch = new EventEmitter();
  @Input() placeholder: string;

  faSearch: IconDefinition | string = faSearch;
  searchText: string;

  handleInput(event) {
    if (event.key === "Enter") this.handleSearch.emit(this.searchText);
  }
}
