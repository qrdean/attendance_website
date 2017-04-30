/*******************************************************************************
*
* This page specifies our Schedule format
*
* @author         : Quinton Dean
* @date_created:  : 4/7/2017
* @last_modified  : 4/26/2017
* @modified_by    : Quinton Dean
*
*******************************************************************************/

export class Schedule {
  crn: string;
  courseName: string;
  classDays: string;
  classTime: string;
  numDays: number;
  classLowerLat: number;
  classUpperLat: number;
  classLowerLong: number;
  classUpperLong: number;
  classAttendedStatus: boolean;
}
