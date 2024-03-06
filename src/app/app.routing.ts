import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { ClientComponent } from "./client/client.component";
import { NotFoundComponent } from "./client/pages/not-found/not-found.component";

const routes: Routes = [
  {
    path: "",
    component: ClientComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./client/pages/home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "about",
        loadChildren: () =>
          import("./client/pages/about/about.module").then(
            (m) => m.AboutModule
          ),
      },
      {
        path: "favorite",
        loadChildren: () =>
          import("./client/pages/favorite/favorite.module").then(
            (m) => m.FavoriteModule
          ),
      },
      {
        path: "cart",
        loadChildren: () =>
          import("./client//pages/cart/cart.module").then((m) => m.CartModule),
      },
      {
        path: "collections",
        loadChildren: () =>
          import("./client/pages/collections/collections.module").then(
            (m) => m.CollectionsModule
          ),
      },
    ],
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "dashboard",
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./admin/pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "customer-management",
        loadChildren: () =>
          import(
            "./admin/pages/customer-management/customer-management.module"
          ).then((m) => m.CustomerManagementModule),
      },
      {
        path: "product-management",
        loadChildren: () =>
          import(
            "./admin/pages/product-management/product-management.module"
          ).then((m) => m.ProductManagementModule),
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
