/*******************************************************************************
*
* This page defines the promise functions that communicate with the backend
* and return either a valid value or an error that is caught and passed to handleError()
*
* @author         : Devin Madeley
* @date_created:  : 4/12/17
* @last_modified  : 4/26/17
* @modified_by    : Quinton Dean
*
*******************************************************************************/

import { Injectable } from '@angular/core';

import { Data } from './data';
//import { ALLDATA } from './mock-data';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

/**Allows other files to import*/
@Injectable()

export class StatService {
//Allows DataService to get data
//Old get Data
//   getData(): Promise<Data> {
//      return Promise.resolve(ALLDATA);
//   }
//Step 4 - updated getData and new class members
				//DEBUG/////////////////////////////////////////////////
  private dataUrl = 'api/datas';  // URL to web api
  private statsUrl = 'http://50.24.235.40:8080/stats';
  constructor(private http: Http) { }
  getData(): Promise<Data[]> {
    return this.http.get(this.dataUrl)
               .toPromise()
               .then(response => response.json().data as Data[])
               .catch(this.handleError);
  }

  // returns a json object to compute on the front end.
  getStats(): Promise<Data> {
    return this.http.get(this.dataUrl)
               .toPromise()
               .then(response => response.json() as Data)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
