/*
Just used for testing until connected to the backend

Quinton Dean  4/7/2017    Created
Quinton Dean  4/10/2017   Edited test data to reflect ER diagram for classes
*/
import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let schedules = [
      {
        crn: 1304,
        courseName: 'Java I',
        professor: 'Varol',
        room: 204,
        classDay: 'MWF',
        classTime: '11:00',
        attended: 0
      },
      {
        crn: 1305,
        courseName: 'Java II',
        professor: 'Cho',
        room: 204,
        classDay: 'TR',
        classTime: '08:00',
        attended: 0
      },
      {
        crn: 2339,
        courseName: 'McGuire I',
        professor: 'McGuire',
        room: 206,
        classDay: 'MWF',
        classTime: '10:00',
        attended: 0
      },
      {
        crn: 3339,
        courseName: 'McGuire II',
        professor: 'McGuire',
        room: 206,
        classDay: 'TR',
        classTime: '13:00',
        attended: 0
      },
      {
        crn: 3345,
        courseName: 'Data Structures',
        professor: 'Burris',
        room: 204,
        classDay: 'MWF',
        classTime: '08:00',
        attended: 0
      },
    ];
    return {schedules};
  }
}
