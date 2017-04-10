/*
Just used for testing until connected to the backend

Quinton Dean  4/7/2017  Created
*/


import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let schedules = [
      {id: 1304, name: 'Java I'},
      {id: 1305, name: 'Java II'},
      {id: 2339, name: 'McGuire I'},
      {id: 3339, name: 'McGuire II'},
      {id: 3345, name: 'Data Structures'},
    ];
    return {schedules};
  }
}
