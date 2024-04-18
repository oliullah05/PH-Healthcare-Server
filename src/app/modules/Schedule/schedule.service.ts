import { addHours, addMinutes, format } from "date-fns";

const insertIntoDB = async (payload: any) => {
    const { startDate, endDate, startTime, endTime } = payload;

    const currentDate = new Date(startDate)
    const lastDate = new Date(endDate)


    const intervalTime = 30;


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
            const scheduleData = {
                startDateTime,
                endDateTime: addMinutes(startDateTime, Number(intervalTime))
            }
            console.log({scheduleData});
        }







    }
}


export const ScheduleServices = {
    insertIntoDB
}
