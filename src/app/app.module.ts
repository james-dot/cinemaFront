import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CinemaComponent } from './cinema/cinema.component';
import {RoutingModule} from './routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CinemaComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
