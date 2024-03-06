import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AdminHeaderComponent } from "./admin-header/admin-header.component";

const COMPONENTS = [SidebarComponent, AdminHeaderComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class AdminSharedModule {}
