import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory, LanguageService } from './services/language/language.service';
import { HttpClient } from '@angular/common/http';

import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { HomeComponent } from './components/pages/home/home.component';
import { TechnologiesComponent } from './components/pages/technologies/technologies.component';
import { AboutComponent } from './components/pages/about/about.component';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { MainComponent } from './components/layout/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TechnologiesComponent,
    AboutComponent,
    GalleryComponent,
    FooterComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LoggerModule.forRoot({
      // serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.TRACE,
      // serverLogLevel: NgxLoggerLevel.ERROR,
      disableConsoleLogging: false
    }),
  ],
  providers: [
    LanguageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
