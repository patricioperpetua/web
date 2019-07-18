import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line: no-implicit-dependencies
import { PathService } from '@app/services/path-service/path.service';

@Component({
  selector: 'app-resume-html',
  templateUrl: './resume-html.component.html',
  styleUrls: ['./resume-html.component.scss']
})
export class ResumeHTMLComponent implements OnInit {

  $sourceFile = this.pathService.$sourceFileHTML;

  constructor(private readonly pathService: PathService) {
  }

  ngOnInit(): void {
  }

}
