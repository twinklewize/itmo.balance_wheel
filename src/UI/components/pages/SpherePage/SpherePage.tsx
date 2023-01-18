import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import AppBar from "../../navigation/AppBar/AppBar";
import {Trash2} from "react-feather";
import Content from "../../UIKit/containers/Content/Content";
import IconChoosing from "../../UIKit/choosing/IconChoosing";
import BackArrow from "../../UIKit/buttons/BackArrow/BackArrow";
import ColorChoosing from "../../UIKit/choosing/ColorChoosing";
import IconButton from "../../UIKit/buttons/IconButton/IconButton";
import InputContainer from "../../UIKit/choosing/InputContainer";
import Button from "../../UIKit/buttons/Button/Button";
import ConfirmModal from "../../modals/ConfirmModal";
import SpheresService from "../../../../data/services/SpheresService";
import {useSpheresContext} from "../../../../data/context/spheresContext";
import {useTasksContext} from "../../../../data/context/tasksContext";

interface Props {
    type: SpherePageType;
}

const SpherePage: React.FC<Props> = ({type}): JSX.Element => {
    let sphereId = useParams().id;
    let spheres = useSpheresContext().spheres;
    let sphere = spheres.find(sphere => sphere.id == sphereId);
    let tasks = useTasksContext().tasks;

    const [name, setName] = useState<string>(sphere?.name ?? '');
    const [color, setColor] = useState<string>(sphere?.color ?? '#EC8C77');
    const [icon, setIcon] = useState<string>(sphere?.icon ?? 'list');

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    let navigate = useNavigate();

    function handleSubmit() {
        if (name.trim().length == 0) return
        navigate('/spheres')
        switch (type) {
            case SpherePageType.create:
                SpheresService.create(name, color, icon).catch(e => console.log(e));
                break
            case SpherePageType.update:
                if (!!sphere) SpheresService.update(sphere.id, name, color, icon).catch(e => console.log(e));
                break
        }
    }

    function handleDelete() {
        if (!sphere) return
        navigate('/spheres');
        SpheresService.delete(sphere.id, tasks, spheres).catch(e => console.log(e));
    }

    return (
        <>
            <div>
                <AppBar
                    title={(<h3>{type == SpherePageType.create ? 'Новая сфера' : 'Редактирование сферы'}</h3>)}
                    leftIcon={(<BackArrow/>)}
                    rightIcon={type == SpherePageType.create ? undefined : (
                        <IconButton onClick={() => setConfirmModalOpen(true)}>
                            <Trash2/>
                        </IconButton>)}/>
                <Content>
                    <InputContainer placeholder={'Друзья'} onChange={(name) => {
                        setName(name)
                    }} value={name}/>
                    <IconChoosing defaultValue={icon}
                                  onChange={(icon) => {
                                      setIcon(icon)
                                  }}/>
                    <ColorChoosing defaultValue={color}
                                   onChange={(color) => {
                                       setColor(color)
                                   }}/>
                    <Button buttonText={'Сохранить'} onClick={handleSubmit}/>
                </Content>

            </div>
            {confirmModalOpen && <ConfirmModal
                onConfirm={handleDelete}
                title={'Удалить сферу'}
                text={'Сфера будет удалена из вашего колеса баланса, задачи не будут затронуты'}
                setOpenModal={setConfirmModalOpen}/>}
        </>
    );
};

export const enum SpherePageType {
    create,
    update,
}

export default SpherePage;