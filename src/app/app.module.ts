import { FilterServiceService } from "./services/filter/filter-service.service";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { APP_BASE_HREF } from "@angular/common";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BookComponent } from "./components/book/book.component";
import { BookListComponent } from "./components/book-list/book-list.component";
import { HeaderComponent } from "./components/header/header.component";
import { SidePanelComponent } from "./components/side-panel/side-panel.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { DropdownComponent } from "./components/drop-down/drop-down.component";
import { SliderComponent } from "./components/slider/slider.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule } from "@angular/forms";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { FavouritesComponent } from "./components/favourites/favourites.component";
import { LoadingIconComponent } from "./components/loading-icon/loading-icon.component";
import { SelectedBookComponent } from "./components/selected-book/selected-book.component";
import { BookService } from "./services/book/book.service";
import { FavouriteService } from "./services/favourite/favourite.service";

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookListComponent,
    HeaderComponent,
    SidePanelComponent,
    SearchBarComponent,
    DropdownComponent,
    SliderComponent,
    DashboardComponent,
    NotFoundComponent,
    FavouritesComponent,
    LoadingIconComponent,
    SelectedBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" },
    BookService,
    FavouriteService,
    FilterServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
