/**Author: Devin Madeley
Date Made: 4-24-17
Last Modified: 4-24-17
Related to Statistics Page
Purpose: Uses InMemoryDbService to create data and return it
	 Replaces mock-data
*/
//replacing the Http client's XHR backend
//service with an in-memory alternative
import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let datas = [
      { id: "20193", mean: 1, missed: 0 },
      { id: "20204", mean: .9, missed: 3 },
      { id: "20207", mean: .5, missed: 20 },
      { id: "20215", mean: .8, missed: 5 }
    ];
    return {datas};
  }
}
