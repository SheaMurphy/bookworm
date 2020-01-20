import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Component, Output, EventEmitter, Input } from "@angular/core";
import { IFilters } from "src/app/services/filter/filter-service.service";

@Component({
  selector: "app-side-panel",
  templateUrl: "./side-panel.component.html",
  styleUrls: ["./side-panel.component.scss"]
})
export class SidePanelComponent {
  @Input() areBooksPresent: boolean;
  @Input() maxPages: number;
  @Input() genres: string[];
  @Output() setFilters = new EventEmitter<IFilters>();

  dropdownLabel = "Choose a genre";
  faFilter = faFilter;
  menuOpen = false;
  filters: IFilters = {
    searchText: "",
    pageCount: 0,
    genre: ""
  };

  setFilter(filterType: string, event: boolean | number | string) {
    this.filters[filterType] = event;
    this.dropdownLabel = this.getDropdownLabel(this.filters.genre);
    this.setFilters.emit(this.filters);
  }

  getDropdownLabel(selectedGenre: string) {
    return selectedGenre ? selectedGenre : "Choose a genre";
  }

  handleMenuClick(): void {
    this.menuOpen = !this.menuOpen;
  }

  resetFilters(): void {
    this.filters = {
      searchText: "",
      pageCount: 0,
      genre: ""
    };
    this.setFilters.emit(this.filters);
    this.dropdownLabel = "Choose a genre";
  }
}
