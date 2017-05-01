/**Author: Devin Madeley
Date Made: 4-12-17
Last Modified: 4-24-17
Related to Statistics Page
Purpose: Service page for student statistics page

*/
//Imports allow data to be referenced
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Data } from './data';

import 'rxjs/add/operator/toPromise';



//Allows other files to import
//Ensures consistency and future-proofing.
@Injectable()

export class StatService {

//updated getData and new class members.
//converts getData() to use HTTP.
  private dataUrl = 'api/datas';  // URL to web api
  constructor(private http: Http) { }

  getData(crn: number): Promise<Data> {
    const url = `${this.dataUrl}/${crn}`;
    console.log(url);
    console.log("here");
    return this.http.get(url)
               .toPromise()
               .then(response => response.json().data as Data)
               .catch(this.handleError);
  }

  //Error handling for HTTP failures
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
