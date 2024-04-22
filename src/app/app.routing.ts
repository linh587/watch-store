import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { PagesComponent } from "./pages/pages.component";
import { AuthGuard } from "./public/guards/auth.guard";

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
        canActivate: [AuthGuard],
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
      {
        path: "checkout",
        loadChildren: () =>
          import("./pages/checkout/checkout.module").then(
            (m) => m.CheckoutModule
          ),
      },
      {
        path: "product",
        loadChildren: () =>
          import("./pages/product-detail/product-detail.module").then(
            (m) => m.ProductDetailModule
          ),
      },
      {
        path: "forgot-password",
        loadChildren: () =>
          import("./pages/forgot-password/forgot-password.module").then(
            (m) => m.ForgotPasswordModule
          ),
      },
      {
        path: "reset-password",
        loadChildren: () =>
          import("./pages/reset-password/reset-password.module").then(
            (m) => m.ResetPasswordModule
          ),
      },
      {
        path: "verify",
        loadChildren: () =>
          import("./pages/verify-email/verify-email.module").then(
            (m) => m.VerifyEmailModule
          ),
      },
      {
        path: "order/vnpay_return",
        loadChildren: () =>
          import("./pages/order-return/order-return.module").then(
            (m) => m.OrderReturnModule
          ),
      },
      {
        path: "order-history",
        canLoad: [AuthGuard],
        loadChildren: () =>
          import("./pages/order-history/order-history.module").then(
            (m) => m.OrderHistoryModule
          ),
      },
      {
        path: "return-policy",
        loadChildren: () =>
          import("./pages/return-policy/return-policy.module").then(
            (m) => m.ReturnPolicyModule
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
