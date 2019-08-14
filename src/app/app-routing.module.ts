// tslint:disable: no-implicit-dependencies
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '@components/pages/about/about.component';
import { GalleryComponent } from '@components/pages/gallery/gallery.component';
import { ResumeHTMLComponent } from '@components/pages/resume/resume-html/resume-html.component';
import { ResumePDFComponent } from '@components/pages/resume/resume-pdf/resume-pdf.component';
import { ResumeComponent } from '@components/pages/resume/resume.component';
import { TechnologiesComponent } from '@components/pages/technologies/technologies.component';

const routes: Routes = [
    // { path: ':lang', component: HomeComponent,
    // children: [
      { path: 'about', component: AboutComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'technologies', component: TechnologiesComponent },
      { path: 'home', component: ResumeHTMLComponent },
      { path: 'resume/pdf', component: ResumePDFComponent },
      { path: 'resume/html', component: ResumeHTMLComponent },
      { path: 'resume', component: ResumeComponent },
      { path: '**', component: ResumeHTMLComponent }
    // ]
  // },
  // { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
