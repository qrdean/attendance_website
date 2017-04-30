/*******************************************************************************
* This page calls functions that are used to display the schedule of a Professor |
* Student and used to take attendance
*
* Quinton Dean  4/7/2017  Created
* Quinton Dean  4/7/2017  Added functionality: getSchedule(), ngOnInit()
* Quinton Dean  4/10/2017 Added functionality: parseTime(), checkDay(), checkTime(),
* Quinton Dean  4/14/2017 Fixed updateAttendance to initialize date var properly
*******************************************************************************/
/**Author: Devin Madeley
Date Made: 4-12-17
Purpose: Temporary data to act as the data coming from the backend to be shown on the statistics page
Error Type: Need to accept data from backend
parameters:
	DataService = HeroService
	ALLDATA = HEROES
	Data = Hero
*/
import { Data } from './data';


export const ALLDATA: Data =
{ mean: .6, missed: 3 }
