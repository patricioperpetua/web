import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable, of } from 'rxjs';
import { Files } from './files-model';

@Injectable({
  providedIn: 'root'
})
export class AwsServiceService {

  FOLDER = 'resume';
  BUCKET = ''; // environment.bucket;

  private static getS3Bucket(): any {
    const bucket = new S3(
      {
        // accessKeyId: environment.accessKeyId,
        // secretAccessKey: environment.secretAccessKey,
        // region: environment.region
      }
    );

    return bucket;
  }

  getFiles(): Observable<Array<Files>> {
    const fileUploads = new Array<Files>();

    const params = {
      Bucket: this.BUCKET,
      Prefix: this.FOLDER
    };

    return AwsServiceService.getS3Bucket()
      .listObjects(params, (err, data) => {
        if (err) {
          console.log('There was an error getting your files: ', err);

          return undefined;
        }
        console.log('Successfully get files.', data);
        const fileDatas = data.Contents;
        fileDatas.forEach(file => {
          fileUploads.push(new Files(file.Key, ('https://s3.amazonaws.com/').concat(params.Bucket, '/' , file.Key)));
        });

        return of(fileUploads);
      });
  }
}
