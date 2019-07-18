import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from '@angular/cdk/layout';

import { MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatSelectModule
  , MatSidenavModule, MatToolbarModule, MatTooltipModule, MatButtonToggleModule, MatSnackBarModule } from '@angular/material';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory, LanguageService } from './services/language/language.service';

import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { FooterComponent } from './components/layout/footer/footer.component';
import { MainComponent } from './components/layout/main/main.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';

import { AboutComponent } from './components/pages/about/about.component';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TechnologiesComponent } from './components/pages/technologies/technologies.component';

import { LanguageSelectorComponent } from './components/basics/language-selector/language-selector.component';
import { VersionSelectorComponent } from './components/basics/version-selector/version-selector.component';

import { ResumeHTMLComponent } from './components/pages/resume/resume-html/resume-html.component';
import { ResumePDFComponent } from './components/pages/resume/resume-pdf/resume-pdf.component';
import { ResumeComponent } from './components/pages/resume/resume.component';
import { SafePipe } from './pipes/safe/safe.pipe';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TechnologiesComponent,
    AboutComponent,
    GalleryComponent,
    FooterComponent,
    MainComponent,
    LanguageSelectorComponent,
    VersionSelectorComponent,
    ResumeComponent,
    ResumeHTMLComponent,
    ResumePDFComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
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
    PdfViewerModule
  ],
  providers: [
    TranslateService,
    LanguageService
  ],
  bootstrap: [AppComponent],
  exports: [
    TranslateModule
  ]
})
export class AppModule { }
