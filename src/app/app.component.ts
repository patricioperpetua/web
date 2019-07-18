import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Eng. Patricio Perpetua';

  constructor(private meta: Meta) {
    this.meta.addTag({
      name: 'description',
      content: `Patricio Perpetua personal web site.`
    });
    this.meta.addTag({
      name: 'keywords',
      content: `Patricio, Perpetua, Patricio Perpetua, Singleton, Singleton SD, Patricio Argentina, Patricio Italia, Patricio Australia`
    });
    this.meta.addTag({
      name: 'robots',
      content: `index,follow`
    });
    this.meta.addTag({
      name: 'title',
      content: `Eng. Patricio Perpetua`
    });
  }
}
