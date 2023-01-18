import React, {useState} from 'react';
import AppBar from "../../navigation/AppBar/AppBar";
import {Trash2} from "react-feather";
import Content from "../../UIKit/containers/Content/Content";
import BackArrow from "../../UIKit/buttons/BackArrow/BackArrow";
import InputContainer from "../../UIKit/choosing/InputContainer";
import ColorChoosing from "../../UIKit/choosing/ColorChoosing";
import HabitScheduleChoosing from "../../UIKit/choosing/HabitScheduleChoosing";
import Button from "../../UIKit/buttons/Button/Button";
import IconButton from "../../UIKit/buttons/IconButton/IconButton";
import {useNavigate, useParams} from "react-router-dom";
import HabitsService from "../../../../data/services/HabitsService";
import {useHabitsContext} from "../../../../data/context/habitsContext";
import ConfirmModal from "../../modals/ConfirmModal";

interface Props {
    type: HabitPageType;
}

const HabitPage: React.FC<Props> = ({type}): JSX.Element => {
    let habitId = useParams().id;
    let habit = useHabitsContext().habits.find(habit => habit.id == habitId);

    const [name, setName] = useState<string>(habit?.name ?? '');
    const [schedule, setSchedule] = useState<{ type: string | null; schedule: string | null; }>({
        type: habit?.type ?? null,
        schedule: habit?.schedule ?? null,
    });
    const [color, setColor] = useState<string>(habit?.color ?? '#EC8C77');

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    let navigate = useNavigate();

    function handleOnSubmit() {
        console.log(name + schedule.type + schedule.schedule)
        if (name.trim().length != 0 && schedule.type != null && schedule.schedule != null) {
            navigate('/habits');
            switch (type) {
                case HabitPageType.create:
                    HabitsService.create(name, color, schedule.type, schedule.schedule).catch(e => console.log(e));
                    break
                case HabitPageType.update:
                    if (habit != undefined)
                        HabitsService.update(habit.id, name, color, schedule.type, schedule.schedule).catch(e => console.log(e));
            }
        }
    }

    function handleDelete() {
        if (!habit) return
        navigate('/habits');
        HabitsService.delete(habit.id).catch(e => console.log(e));
    }

    function getTitle(): string {
        return type == HabitPageType.create ? 'Новая привычка' : 'Редактировать привычку';
    }

    return (
        <>
            <div>
                <AppBar
                    title={(<h3>{getTitle()}</h3>)}
                    leftIcon={(<BackArrow/>)}
                    rightIcon={(type == HabitPageType.update ? <IconButton
                        onClick={() => {setConfirmModalOpen(true);
                    }}><Trash2/></IconButton> : undefined)}
                />
                <Content>
                    <InputContainer placeholder={'Выпивать стакан воды'}
                                    onChange={name => setName(name)}
                                    value={name}/>
                    <ColorChoosing
                        defaultValue={color}
                        onChange={color => setColor(color)}/>
                    <HabitScheduleChoosing
                        defaultValue={schedule}
                        onChange={(type, schedule) => {
                            setSchedule({type: type, schedule: schedule})
                        }}/>
                    <Button buttonText={'Сохранить'} onClick={handleOnSubmit}/>
                </Content>
            </div>
            {confirmModalOpen && <ConfirmModal
                onConfirm={handleDelete}
                title={'Удалить привычку'}
                text={'Вся информация о привычке будет полностью удалена '}
                setOpenModal={setConfirmModalOpen}/>}
        </>
    );
};

export const enum HabitPageType {
    create,
    update,
}

export default HabitPage;