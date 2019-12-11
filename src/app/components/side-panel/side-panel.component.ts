import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Component, Output, EventEmitter, Input } from "@angular/core";
import { IFilters } from "../dashboard/dashboard.component";

@Component({
  selector: "app-side-panel",
  templateUrl: "./side-panel.component.html",
  styleUrls: ["./side-panel.component.scss"]
})
export class SidePanelComponent {
  @Input() areBooksPresent: boolean;
  @Input() maxPages: number;
  @Input() genres: string[];
  @Output() setFilters = new EventEmitter();

  currentGenre: string = "Choose a genre";
  faFilter = faFilter;
  menuOpen = false;
  filters: IFilters = {
    genre: "",
    searchText: "",
    pageCount: 0
  };

  setFilter(filterType: string, event: boolean | number | string) {
    this.filters[filterType] = event;
    this.currentGenre = this.filters.genre;
    this.setFilters.emit(this.filters);
  }

  handleMenuClick(): void {
    this.menuOpen = !this.menuOpen;
  }

  resetFilters(): void {
    this.setFilters.emit({
      searchText: "",
      maxPages: 0,
      genres: []
    });
    this.currentGenre = "Choose a genre";
  }
}
