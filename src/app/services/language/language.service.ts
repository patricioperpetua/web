import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es-AR';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// tslint:disable-next-line: no-implicit-dependencies
import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject } from 'rxjs';

const SERVICE_NAME = 'LANGUAGE';

// Translation module.
export const HttpLoaderFactory = (http: HttpClient): TranslateHttpLoader => {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
};

@Injectable()
export class LanguageService {

  private readonly ARG_LANGUAGE = 'ARG_LANGUAGE';

  private readonly languages: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>(['es', 'en']);

  private readonly selected: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  public readonly availableLanguages: Array<string> = ['es', 'en', 'it', 'fr'];

  constructor(private readonly translate: TranslateService
            , private readonly logger: NGXLogger) {
      this.selected.subscribe(newLang => {
        if (newLang) {
          this.logger.debug(SERVICE_NAME, 'Applying language', newLang);
          localStorage.setItem(this.ARG_LANGUAGE, newLang);
          translate.setDefaultLang(newLang);
          registerLocaleData(this.getLocaleLanguage(newLang));
          translate.use(newLang);
        }
      });
      let lang = localStorage.getItem(this.ARG_LANGUAGE);
      if (!lang) {
        logger.info(SERVICE_NAME, 'No language selected.');
        lang = this.translate.getBrowserLang();
        logger.info(SERVICE_NAME, 'Default language detected', lang);
      }
      switch (lang) {
        case 'es':
        case 'en':
        case 'it':
        case 'fr':
          this.selected.next(lang);
          break;
        default:
          this.selected.next('es');
          break;
      }
  }

  public setLanguage(newLanguage: string): void {
    this.selected.next(newLanguage);
  }

  public getCurrentLanguage(): string {
    return this.selected.getValue();
  }

  public getCurrentLanguageSubject(): BehaviorSubject<string> {
    return this.selected;
  }

  public getLanguages(): Array<string> {
    return this.languages.getValue();
  }

  public getLanguagesSubject(): BehaviorSubject<Array<string>> {
    return this.languages;
  }

  public getLocaleLanguage(lang: string): any {
    switch (lang) {
      case 'es':
        return localeEs;
      case 'en':
        return localeEn;
      case 'it':
        return localeIt;
      case 'fr':
        return localeFr;
      default:
        return undefined;
    }
  }
}
