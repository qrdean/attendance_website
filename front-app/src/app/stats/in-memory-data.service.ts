/*******************************************************************************
*
* This page specifies our mock-backend for testing the statistics page
*
* @author         : Devin Madeley
* @date_created:  : 4/12/17
* @last_modified  : 4/12/17
* @modified_by    : Devin Madeley
*
*******************************************************************************/
import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let datas = [
    { crn: 20204, mean: .6, missed: 3 }
    ];
    return {datas};
  }
}
