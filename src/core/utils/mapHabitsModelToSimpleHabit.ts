import {HabitModel, SimpleHabitModel} from "../../domain/models/HabitModel";
import {getDateFromTimestamp, getDateWithoutTime, getDayOfWeek, getStartOfWeek, isSameDates} from "./DateUtils";
import {digitsFromStringNumber} from "./digitsFromStringNumber";
import HabitsService from "../../data/services/HabitsService";


export default function mapHabitModelsToSimpleHabits(habits: HabitModel[], selectedDate: Date) {
    function onCheck(habit: HabitModel) {
        HabitsService.check(habit, selectedDate).then().catch(e => console.log(e));
    }

    let simpleHabits: SimpleHabitModel[] = [];
    habits.forEach((habit) => {
        console.log(habit.type);
        let checkedDate = habit.checkedDates.find(date => isSameDates(getDateFromTimestamp(date!), selectedDate));
        let simpleHabit: SimpleHabitModel = {
            color: habit.color,
            id: habit.id,
            isChecked: !!checkedDate,
            name: habit.name,
            onCheck: () => onCheck(habit),
        };
        if (!!checkedDate) {
            simpleHabits.push(simpleHabit);
        } else if (getDateWithoutTime(new Date(habit.startDate as string)).valueOf() <= getDateWithoutTime(selectedDate).valueOf()) {
            switch (habit.type) {
                case 'interval':
                    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                    let startDate = new Date(habit.startDate as string);

                    const diffDays = Math.round(Math.abs(selectedDate.valueOf() - startDate.valueOf()) / oneDay);
                    if ((diffDays % Number(habit.schedule)) === 0 && diffDays >= 0) simpleHabits.push(simpleHabit);
                    break
                case 'days':
                    let daysOfWeek = digitsFromStringNumber(habit.schedule);

                    if (daysOfWeek.includes(getDayOfWeek(selectedDate)))
                        simpleHabits.push(simpleHabit);
                    break
                case 'week':
                    let currentDate = new Date();
                    let startOfWeekSelectedDate = getStartOfWeek(selectedDate);
                    let startOfWeekCurrentDate = getStartOfWeek(currentDate);

                    let checkedDaysSelectedWeek: number[] = [];
                    habit.checkedDates.forEach((date) => {
                        let parsedDate = getDateFromTimestamp(date!);
                        let startOfWeekCheckedDate = getStartOfWeek(parsedDate!);
                        if (isSameDates(startOfWeekCheckedDate, startOfWeekSelectedDate)) {
                            checkedDaysSelectedWeek.push(getDayOfWeek(parsedDate!));
                        }
                    })

                    let notCheckedHabitsCount = Number(habit.schedule) - checkedDaysSelectedWeek.length;
                    if (notCheckedHabitsCount <= 0) break;

                    let notCheckedDaysSelectedWeekDays: number[] = []
                    if (startOfWeekSelectedDate < startOfWeekCurrentDate) {
                        for (let i = 6; i >= 0 && notCheckedDaysSelectedWeekDays.length != notCheckedHabitsCount; i--) {
                            if (!checkedDaysSelectedWeek.includes(i)) notCheckedDaysSelectedWeekDays.push(i);
                        }
                    } else if (isSameDates(startOfWeekSelectedDate, startOfWeekCurrentDate)) {
                        for (let i = getDayOfWeek(currentDate); i < 7 && notCheckedDaysSelectedWeekDays.length != notCheckedHabitsCount; i++) {
                            if (!checkedDaysSelectedWeek.includes(i)) notCheckedDaysSelectedWeekDays.push(i);
                        }
                        for (let i = 6; i >= 0 && notCheckedDaysSelectedWeekDays.length != notCheckedHabitsCount; i--) {
                            if (![...checkedDaysSelectedWeek, ...notCheckedDaysSelectedWeekDays].includes(i)) notCheckedDaysSelectedWeekDays.push(i);
                        }
                    } else if (startOfWeekSelectedDate > startOfWeekCurrentDate) {
                        for (let i = 0; i < 7 && notCheckedDaysSelectedWeekDays.length != notCheckedHabitsCount; i++) {
                            if (!checkedDaysSelectedWeek.includes(i)) notCheckedDaysSelectedWeekDays.push(i);
                        }
                    }
                    if (notCheckedDaysSelectedWeekDays.includes(getDayOfWeek(selectedDate))) simpleHabits.push(simpleHabit);
                    break


            }
        }
    })
    return simpleHabits;
}