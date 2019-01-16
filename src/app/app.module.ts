import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ViewModelResolver } from "./resolver.directive";

@NgModule({
  declarations: [AppComponent, ViewModelResolver],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
