import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardsComponent } from './cards/cards.component';
import { SharedService } from 'src/Services/shared.service';
import { Interceptor } from 'src/Services/interceptor';
@NgModule({
  declarations: [
    AppComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [SharedService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
