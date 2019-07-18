import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
// tslint:disable-next-line: no-implicit-dependencies
import { LanguageService } from '@app/services/language/language.service';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-resume-pdf',
  templateUrl: './resume-pdf.component.html',
  styleUrls: ['./resume-pdf.component.scss']
})
export class ResumePDFComponent implements OnInit {

  sourceMainPath = '/assets/resume/latest/pdf/';
  sourceName = 'Patricio_Perpetua';
  sourceVersion = 'latest';

  defaultVersion = this.sourceMainPath.concat(this.sourceName, '-', this.sourceVersion, '-', 'en', '.pdf');

  sourceFile = new BehaviorSubject<string>(this.defaultVersion);
  $sourceFile = this.sourceFile.asObservable();

  constructor(langService: LanguageService
            , http: HttpClient
            , logger: NGXLogger
            , snackBar: MatSnackBar
            , translate: TranslateService) {
    langService.getCurrentLanguageSubject()
      .subscribe(lang => {
        const newSource = this.sourceMainPath.concat(this.sourceName, '-', this.sourceVersion, '-', lang, '.pdf');
        if (newSource === this.sourceFile.getValue()) {
          return;
        }
        logger.debug('Looking for', lang, 'version of resume');
        http.get(newSource, { responseType: 'text' })
          .subscribe(() => {
            logger.debug(lang, 'version of resume FOUND');
            this.sourceFile.next(newSource);
          }, error => {
            logger.debug(lang, 'version of resume NOT found');
            if (newSource !== this.defaultVersion) {
              this.sourceFile.next(this.defaultVersion);
            }
            translate.get('translator.not_found.resume')
              .subscribe(text => {
                snackBar.open(text, undefined, {
                  duration: 4 * 1000,
                  panelClass: ['snackbar']
              });
            });
          });
      });
    }

  ngOnInit(): void {
  }

  }
