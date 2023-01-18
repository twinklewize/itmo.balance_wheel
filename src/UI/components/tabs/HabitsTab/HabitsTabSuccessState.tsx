import React, {useEffect, useState} from 'react';
import {HabitModel, SimpleHabitModel} from "../../../../domain/models/HabitModel";
import AppBar from "../../navigation/AppBar/AppBar";
import SettingsPopupMenu from "../../popups/SettingsPopupMenu";
import Content from "../../UIKit/containers/Content/Content";
import Calendar, {CalendarType} from "../../UIKit/special/Calendar/Calendar";
import AccordionList, {AccordionListType} from "../../UIKit/tasks/AccordionList/AccordionList";
import HabitsEmptyStatePlaceholder from "./components/HabitsEmptyStatePlaceholder";
import {Link} from "react-router-dom";
import AddButton from "../../UIKit/buttons/AddButton/AddButton";
import mapHabitModelsToSimpleHabits from "../../../../core/utils/mapHabitsModelToSimpleHabit";

function HabitsTabSuccessTab({habits}: {
    habits: HabitModel[]
}) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDateHabits, setSelectedDateHabits] = useState<SimpleHabitModel[]>([]);

    useEffect(() => {
        setSelectedDateHabits(mapHabitModelsToSimpleHabits(habits, selectedDate));
    }, [selectedDate, habits])


    let notCompletedHabits = selectedDateHabits.filter((habit) => !habit.isChecked);
    let completedHabits = selectedDateHabits.filter((habit) => habit.isChecked);

    return (
        <>
            <AppBar title={(<h3>Привычки</h3>)} rightIcon={(<SettingsPopupMenu/>)}/>
            <Content marginBottom={72}>
                <Calendar
                    onChange={(date) => setSelectedDate(date)}
                    calendarType={CalendarType.week}/>
                {notCompletedHabits.length != 0 &&
                    <AccordionList type={AccordionListType.habits}
                                   key={selectedDate.toString() + 'completed'}
                                   habits={notCompletedHabits}/>}
                {completedHabits.length != 0 &&
                    <AccordionList type={AccordionListType.completed}
                                   key={selectedDate.toString() + 'not completed'}
                                   habits={completedHabits}/>}
                {selectedDateHabits.length === 0 && <HabitsEmptyStatePlaceholder/>}
            </Content>
            <Link to={"/habit/create"}><AddButton/></Link>
        </>
    );
}

export default HabitsTabSuccessTab;

