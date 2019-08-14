// tslint:disable: no-implicit-dependencies
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleAnalyticsService } from '@app/services/google-analytics/google-analytics.service';
import { LanguageService } from '@app/services/language/language.service';
import { PathService } from '@app/services/path-service/path.service';
import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  isPDFRendered: BehaviorSubject<boolean> = new BehaviorSubject(true);
  $isPDFRendered: Observable<boolean> = this.isPDFRendered.asObservable();

  constructor(private readonly breakpointObserver: BreakpointObserver
            , public  readonly logger: NGXLogger
            , router: Router
            , private readonly pathService: PathService
            , private readonly googleService: GoogleAnalyticsService
            , private readonly language: LanguageService) {
    router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const pdfRendered = !e.url.toString()
          .includes('pdf');
        this.isPDFRendered.next(pdfRendered);
      });
  }

  downloadResume(): void {
    this.logger.debug('Downloading resume...');
    window.open(this.pathService.getPDFPath());
    this.googleService.eventEmitter('download_resume', this.language.getCurrentLanguage(), 'download', 'click', 1);
  }

}
