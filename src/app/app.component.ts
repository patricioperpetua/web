import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Eng. Patricio Perpetua';

  constructor(meta: Meta
            , router: Router) {
    meta.addTag({
      name: 'description',
      content: `Patricio Perpetua personal web site.`
    });
    meta.addTag({
      name: 'keywords',
      content: `Patricio, Perpetua, Patricio Perpetua, Singleton, Singleton SD, Patricio Argentina, Patricio Italia, Patricio Australia`
    });
    meta.addTag({
      name: 'robots',
      content: `index,follow`
    });
    meta.addTag({
      name: 'title',
      content: `Eng. Patricio Perpetua`
    });

    router.events
      .subscribe(event => {
      if (event instanceof NavigationEnd) {
          gtag('config', 'UA-144100790-1',
                {
                  page_path: event.urlAfterRedirects
                }
              );
      }
    });

  }
}
