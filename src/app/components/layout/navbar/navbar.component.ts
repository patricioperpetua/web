// tslint:disable: no-implicit-dependencies
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
            , private readonly router: Router) {
    router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const pdfRendered = !e.url.toString()
          .includes('pdf');
        this.isPDFRendered.next(pdfRendered);
      });
  }

  downloadResume(): void {
    this.logger.debug('Downloading resume...');
    window.open('/assets/resume/latest/pdf/Patricio_Perpetua-latest-en-complement.pdf', '_blank');
  }

}
