// tslint:disable: no-implicit-dependencies
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { LanguageService } from '@services/language/language.service';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private readonly breakpointObserver: BreakpointObserver
            , public readonly logger: NGXLogger) {}

  downloadResume(): void {
    this.logger.debug('Downloading resume...');
    window.open('/assets/resume/latest/pdf/Patricio_Perpetua-latest-en-complement.pdf', '_blank');
  }

}
