import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line: no-implicit-dependencies
import { PathService } from '@app/services/path-service/path.service';

@Component({
  selector: 'app-resume-pdf',
  templateUrl: './resume-pdf.component.html',
  styleUrls: ['./resume-pdf.component.scss']
})
export class ResumePDFComponent implements OnInit {

  $sourceFile = this.pathService.$sourceFilePDF;

  constructor(private readonly pathService: PathService) {
    }

  ngOnInit(): void {
  }

  }
