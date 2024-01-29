import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { PagesComponent } from "./pages/pages.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routing";
import { SharedModule } from "./components/shared.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

@NgModule({
  declarations: [AppComponent, PagesComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
