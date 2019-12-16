import {
  FavouriteService,
  MockFavService
} from "./../../services/favourite/favourite.service";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FavouritesComponent } from "./favourites.component";
import { Component, Input } from "@angular/core";
import { IBook } from "src/app/services/book/book.service";

@Component({ selector: "app-book-list", template: "" })
class StubBookListComponent {
  @Input() books: IBook[];
}

describe("FavouritesComponent", () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavouritesComponent, StubBookListComponent],
      providers: [{ provide: FavouriteService, useClass: MockFavService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
