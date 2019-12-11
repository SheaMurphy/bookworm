import { FavouritesComponent } from "./components/favourites/favourites.component";
import { BookListComponent } from "./components/book-list/book-list.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "favourites", component: FavouritesComponent },
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
