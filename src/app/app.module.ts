import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* MODULOS EXTERNOS */
import { ChartsModule } from 'ng2-charts';
/* MODULOS */
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

/* COMPONENTS */
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';







@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    PagesModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
