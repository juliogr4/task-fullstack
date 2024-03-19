import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http"
import { GlobalLoaderService } from './shared/service/global-loader.service';
import { SharedModule } from './shared/shared.module';
import { AlertService } from './shared/service/alert.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    GlobalLoaderService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
