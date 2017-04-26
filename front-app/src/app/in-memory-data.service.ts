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
        crn: 20204,
        courseName: 'compiler design',
        professor: '666666',
        room: "AB1-206",
        classDay: 'MWF',
        classTime: '02:00',
        numberOfSessions: 31
      },
      {
        crn: 20207,
        courseName: 'software engineering',
        professor: '666666',
        room: "AB1-206",
        classDay: 'MWF',
        classTime: '09:00',
        numberOfSessions: 47
      },
      {
        crn: 20215,
        courseName: 'operating systems',
        professor: '666666',
        room: "AB1-206",
        classDay: 'MWF',
        classTime: '12:00',
        numberOfSessions: 47
      },
    ];
    return {schedules};
  }
}
