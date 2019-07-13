import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-resume-html',
  templateUrl: './resume-html.component.html',
  styleUrls: ['./resume-html.component.scss']
})
export class ResumeHTMLComponent implements OnInit {

  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(url): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
  }

}
