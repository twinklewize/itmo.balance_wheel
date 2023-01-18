import React, {useEffect, useState} from 'react';
import {HabitModel, SimpleHabitModel} from "../../../../domain/models/HabitModel";
import {TaskModel} from "../../../../domain/models/TaskModel";
import AppBar from "../../navigation/AppBar/AppBar";
import IconButton from "../../UIKit/buttons/IconButton/IconButton";
import Calendar, {CalendarType} from "../../UIKit/special/Calendar/Calendar";
import {Grid} from "react-feather";
import SettingsPopupMenu from "../../popups/SettingsPopupMenu";
import Content from "../../UIKit/containers/Content/Content";
import TasksList from "../../UIKit/tasks/TasksList/TasksList";
import AddButton from "../../UIKit/buttons/AddButton/AddButton";
import TaskModal from "../../modals/TaskModal/TaskModal";
import AccordionList, {AccordionListType} from "../../UIKit/tasks/AccordionList/AccordionList";
import CalendarEmptyStatePlaceholder from "./components/CalendarEmptyStatePlaceholder";
import {getDateFromTimestamp, isSameDates} from "../../../../core/utils/DateUtils";
import mapHabitModelsToSimpleHabits from "../../../../core/utils/mapHabitsModelToSimpleHabit";

function CalendarTabSuccessState({habits, tasks}: {
    habits: HabitModel[]
    tasks: TaskModel[]
}) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [calendarType, setCalendarType] = useState(CalendarType.month);

    const [selectedDateHabits, setSelectedDateHabits] = useState<SimpleHabitModel[]>([]);
    const [selectedDateTasks, setSelectedDateTasks] = useState<TaskModel[]>([]);

    useEffect(() => {
        let filteredTasks = tasks.filter((task) => isSameDates(getDateFromTimestamp(task.date), selectedDate))
        setSelectedDateTasks(filteredTasks);
        setSelectedDateHabits(mapHabitModelsToSimpleHabits(habits, selectedDate));
    }, [selectedDate, tasks, habits])

    let completedTasks = selectedDateTasks.filter((task) => task.isChecked);
    let notCompletedTasks = selectedDateTasks.filter((task) => !task.isChecked);
    let completedHabits = selectedDateHabits.filter((habit) => habit.isChecked);
    let notCompletedHabits = selectedDateHabits?.filter((habit) => !habit.isChecked);

    return (
        <>
            <>
                <AppBar
                    title={<h3>Календарь</h3>}
                    leftIcon={(
                        <IconButton
                            onClick={() => setCalendarType(calendarType == CalendarType.week ? CalendarType.month : CalendarType.week)}>
                            <Grid/>
                        </IconButton>
                    )}
                    rightIcon={(<SettingsPopupMenu/>)}/>
                <Content marginBottom={72}>
                    <Calendar
                        onChange={(date) => setSelectedDate(date)}
                        calendarType={calendarType}/>
                    {notCompletedTasks.length != 0 && <TasksList tasks={notCompletedTasks}/>}
                    {notCompletedHabits.length != 0 && <AccordionList type={AccordionListType.habits}
                                                                      habits={notCompletedHabits}/>}
                    {(completedTasks.length != 0 || completedHabits.length != 0) &&
                        <AccordionList tasks={completedTasks}
                                       habits={completedHabits}
                                       type={AccordionListType.completed}/>}
                    {selectedDateTasks.length === 0 && selectedDateHabits.length === 0 &&
                        <CalendarEmptyStatePlaceholder/>}
                </Content>
                <AddButton onClick={() => setTaskModalOpen(true)}/>
            </>
            {taskModalOpen && <TaskModal defaultDate={selectedDate} setOpenModal={setTaskModalOpen}/>}
        </>
    );
}

export default CalendarTabSuccessState;

