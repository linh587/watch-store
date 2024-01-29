import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

const COMPONENTS = [HeaderComponent, FooterComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class SharedModule {}
