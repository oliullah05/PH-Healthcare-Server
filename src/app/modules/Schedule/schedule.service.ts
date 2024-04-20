import { addHours, addMinutes, format } from "date-fns";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (payload: any) => {
    const { startDate, endDate, startTime, endTime } = payload;

    const currentDate = new Date(startDate)
    const lastDate = new Date(endDate)

    const intervalTime = 30;
    let createdSchedules = []

    while (currentDate <= lastDate) {

        // 
        const startDateTime = new Date(
            addHours(
                `$${format(currentDate, "yyyy-MM-dd")}`,
                Number(startTime.split(":")[0])
            )
        )

        // 
        const endDateTime = new Date(
            addHours(
                `$${format(currentDate, "yyyy-MM-dd")}`,
                Number(endTime.split(":")[0])
            )
        )

       

        while (startDateTime < endDateTime) {
            // console.log(startDateTime,endDateTime);
            const scheduleData = {
                startDateTime,
                endDateTime: addMinutes(startDateTime, Number(intervalTime))
            }
            console.log(scheduleData);
            const result = prisma.schedule.create({
                data: scheduleData
            })
            createdSchedules.push(result)
            startDateTime.setMinutes(startDateTime.getMinutes() + Number(intervalTime))
        }



        currentDate.setDate(currentDate.getDate() + 1)
    }
  return createdSchedules;
}


export const ScheduleServices = {
    insertIntoDB
}
