import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routing";
import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AdminComponent } from "./admin/admin.component";
import { AdminSharedModule } from "./admin/components/admin-shared.module";
import { ClientSharedModule } from "./client/components/client-shared.module";
import { ClientComponent } from "./client/client.component";
import { NotFoundComponent } from "./client/pages/not-found/not-found.component";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppInterceptor } from "./interceptors/app.interceptors";

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    AdminComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientSharedModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AdminSharedModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
