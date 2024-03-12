import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { PagesComponent } from "./pages/pages.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./pages/home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "about",
        loadChildren: () =>
          import("./pages/about/about.module").then((m) => m.AboutModule),
      },
      {
        path: "favorite",
        loadChildren: () =>
          import("./pages/favorite/favorite.module").then(
            (m) => m.FavoriteModule
          ),
      },
      {
        path: "profile",
        loadChildren: () =>
          import("./pages/account-profile/account-profile.module").then(
            (m) => m.AccountProfileModule
          ),
      },
      {
        path: "cart",
        loadChildren: () =>
          import("./pages/cart/cart.module").then((m) => m.CartModule),
      },
      {
        path: "collections",
        loadChildren: () =>
          import("./pages/collections/collections.module").then(
            (m) => m.CollectionsModule
          ),
      },
    ],
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
