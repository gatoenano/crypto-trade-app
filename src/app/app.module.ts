// Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
// Components
import { AppComponent } from './app.component';
import { NavbarComponent, FooterComponent, ItemsListComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ItemsListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-Us' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
