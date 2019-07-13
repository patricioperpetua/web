import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line: no-implicit-dependencies
import { LanguageService } from '@services/language/language.service';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  public selectedLanguage: Observable<string> = this.languageService.getCurrentLanguageSubject()
    .asObservable();

  constructor(public readonly languageService: LanguageService
            , public readonly logger: NGXLogger) { }

  ngOnInit(): void {
  }

  switchLanguage(newLanguage: string): void {
    this.languageService.setLanguage(newLanguage);
  }

}
