import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LanguageService } from '../language/language.service';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  private readonly sourceMainPath = '/assets/resume/';
  private readonly sourceMainHTMLPath = 'html/';
  private readonly sourceMainPDFPath = 'pdf/';

  private readonly sourceName = 'Patricio_Perpetua';
  private readonly latestVersion = 'latest';

  public displayedVersion = new BehaviorSubject<string>(this.latestVersion);

  private readonly defaultPDFVersion = this.sourceMainPath.concat(this.displayedVersion.getValue(),
    '/', this.sourceMainPDFPath, this.sourceName, '-', this.latestVersion, '-', 'en', '.pdf');

  private readonly defaultHTMLVersion = this.sourceMainPath.concat(this.displayedVersion.getValue(),
      '/', this.sourceMainHTMLPath, this.sourceName, '-', this.latestVersion, '-', 'en', '.html');

  public sourceFileHTML = new BehaviorSubject<string>(this.defaultHTMLVersion);
  public $sourceFileHTML = this.sourceFileHTML.asObservable();

  public sourceFilePDF = new BehaviorSubject<string>(this.defaultPDFVersion);
  public $sourceFilePDF = this.sourceFilePDF.asObservable();

  constructor(private readonly langService: LanguageService
            , http: HttpClient
            , private readonly logger: NGXLogger
            , snackBar: MatSnackBar
            , translate: TranslateService
            , router: Router) {
    console.log(this.defaultPDFVersion);
    console.log(this.defaultHTMLVersion);
    langService.getCurrentLanguageSubject()
    .subscribe(lang => {
      const newPDFSource = this.sourceMainPath.concat(this.displayedVersion.getValue(),
        '/', this.sourceMainPDFPath, this.sourceName, '-', this.displayedVersion.getValue(), '-', lang, '.pdf');
      const newHTMLSource = this.sourceMainPath.concat(this.displayedVersion.getValue(),
        '/', this.sourceMainHTMLPath, this.sourceName, '-', this.displayedVersion.getValue(), '-', lang, '.html');
      let pdfFound = true;
      let htmlFound = true;
      const requests = [];
      if (newPDFSource !== this.sourceFilePDF.getValue()) {
        logger.debug('Looking pdf for', lang, 'version of resume');
        requests.push(http.get(newPDFSource, { responseType: 'text' })
          .subscribe(() => {
            pdfFound = true;
            logger.debug(lang, 'pdf version of resume FOUND');
            this.sourceFilePDF.next(newPDFSource);
          }, error => {
            pdfFound = false;
            logger.debug(lang, 'pdf version of resume NOT found');
            if (newPDFSource !== this.defaultPDFVersion) {
              this.sourceFilePDF.next(this.defaultPDFVersion);
            }
          }));
      }
      if (newHTMLSource !== this.sourceFileHTML.getValue()) {
        logger.debug('Looking html for', lang, 'version of resume');
        requests.push(http.get(newHTMLSource, { responseType: 'text' })
          .subscribe(() => {
            htmlFound = true;
            logger.debug(lang, 'html version of resume FOUND');
            this.sourceFileHTML.next(newHTMLSource);
          }, error => {
            htmlFound = false;
            logger.debug(lang, 'html version of resume NOT found');
            if (newHTMLSource !== this.defaultHTMLVersion) {
              this.sourceFileHTML.next(this.defaultHTMLVersion);
            }
          }));
      }
      // forkJoin(...requests)
      //   .subscribe(() => {
      if (!pdfFound || !htmlFound) {
        router.events.pipe(filter(e => e instanceof NavigationEnd))
          .subscribe((e: NavigationEnd) => {
            const pdfRendered = !e.url.toString()
              .includes('pdf');
            if ((pdfRendered && !pdfFound) || (!pdfRendered && !htmlFound)) {
              translate.get('translator.not_found.resume')
                .subscribe(text => {
                  snackBar.open(text, undefined, {
                    duration: 4 * 1000,
                    panelClass: ['snackbar']
                });
              });
            }
          });
      }
    });
    // });
  }

  public getPDFPath(): string {
    return this.sourceFilePDF.getValue();
  }
}
