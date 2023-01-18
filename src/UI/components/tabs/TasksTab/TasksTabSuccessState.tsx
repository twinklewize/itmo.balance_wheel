import React, {ReactNode, useState} from 'react';
import AddButton from "../../UIKit/buttons/AddButton/AddButton";
import AppBar from "../../navigation/AppBar/AppBar";
import TasksList from "../../UIKit/tasks/TasksList/TasksList";
import Content from "../../UIKit/containers/Content/Content";
import TaskModal from "../../modals/TaskModal/TaskModal";
import {Menu} from "react-feather";
import SideBar from "../../navigation/SideBar/SideBar";
import {TaskModel} from "../../../../domain/models/TaskModel";
import {ProjectModel} from "../../../../domain/models/ProjectModel";
import ProjectPopupMenu from "../../popups/ProjectPopupMenu";
import TasksEmptyStatePlaceholder from "./components/TasksEmptyStatePlaceholder";
import IconButton from "../../UIKit/buttons/IconButton/IconButton";
import getProjectName from "../../../../core/utils/getProjectName";
import AccordionList, {AccordionListType} from "../../UIKit/tasks/AccordionList/AccordionList";
import {SphereModel} from "../../../../domain/models/SphereModel";
import SettingsPopupMenu from "../../popups/SettingsPopupMenu";
import ConfirmModal from "../../modals/ConfirmModal";
import InputModal from "../../modals/InputModal";
import ProjectsService from "../../../../data/services/ProjectsService";

function TasksTabSuccessState({tasks, projects, spheres, inboxId}: {
    tasks: TaskModel[]
    projects: ProjectModel[],
    spheres: SphereModel[],
    inboxId: string,
}) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [editProjectModalOpen, setEditProjectModalOpen] = useState(false);
    const [confirmDeleteProjectModalOpen, setConfirmDeleteProjectModalOpen] = useState(false);
    const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);


    const [currentListId, setCurrentListId] = useState<string>(inboxId);
    const [currentListType, setCurrentListType] = useState<ListType>(ListType.project);

    function getTitle(): string {
        switch (currentListType) {
            case ListType.project:
                return getProjectName(projects.find(p => p.id == currentListId)?.name ?? '')
            case ListType.sphere:
                return spheres.find(p => p.id == currentListId)?.name ?? ''
        }
    }

    function getRightIcon(): ReactNode {
        return (currentListType === ListType.project && currentListId != inboxId) ?
            <ProjectPopupMenu
                setDeleteConfirmModalOpen={() => setConfirmDeleteProjectModalOpen(true)}
                setEditModalOpen={() => setEditProjectModalOpen(true)}/> :
            <SettingsPopupMenu/>
    }

    function createProject(name: string) {
        ProjectsService.create(name).then().catch(e => console.log(e));
        setCreateProjectModalOpen(false);
    }

    function deleteProject() {
        setCurrentListId(inboxId)
        setConfirmDeleteProjectModalOpen(false)
        ProjectsService.delete(currentListId, tasks).then();
    }

    function editProject(name: string) {
        if (name.trim().length == 0) return;
        setEditProjectModalOpen(false);
        ProjectsService.update(currentListId, name).then();
    }


    let filteredTasks = tasks.filter((task) => {
        switch (currentListType) {
            case ListType.project:
                return task.projectId === currentListId;
            case ListType.sphere:
                return task.spheresIds.includes(currentListId)
        }
    })

    let completedTasks = filteredTasks.filter((task) => task.isChecked);
    let notCompletedTasks = filteredTasks.filter((task) => !task.isChecked);

    return (
        <div>
            <>
                <AppBar
                    title={(<h3>{getTitle()}</h3>)}
                    leftIcon={(<IconButton onClick={showSidebar}><Menu/></IconButton>)}
                    rightIcon={getRightIcon()}/>
                <Content marginBottom={72}>
                    {notCompletedTasks.length != 0 && <TasksList tasks={notCompletedTasks}/>}
                    {completedTasks.length != 0 &&
                        <AccordionList type={AccordionListType.completed}
                                       tasks={completedTasks != null ? completedTasks : []}/>}
                    {filteredTasks.length === 0 && <TasksEmptyStatePlaceholder/>}
                </Content>
                <AddButton onClick={() => setTaskModalOpen(true)}/>
            </>
            {sidebar && <SideBar
                setCurrentListId={setCurrentListId}
                setCurrentListType={setCurrentListType}
                setActive={showSidebar}
                setCreateProjectModalOpen={setCreateProjectModalOpen}/>}
            {taskModalOpen && <TaskModal
                setOpenModal={setTaskModalOpen}
                defaultListId={currentListId}
                defaultListType={currentListType}/>}
            {confirmDeleteProjectModalOpen && <ConfirmModal
                onConfirm={deleteProject}
                title={currentListType == ListType.project ? 'Удалить список' : 'Удалить сферу'}
                text={currentListType == ListType.project ?
                    'Список будет удален вместе со всеми задачами, которые в нем находятся' :
                    'Сфера будет удалена из вашего колеса баланса, задачи не будут затронуты'}
                setOpenModal={setConfirmDeleteProjectModalOpen}/>}
            {createProjectModalOpen && <InputModal
                onSubmit={createProject}
                title={'Новый список'}
                placeholder={'Название списка'}
                setOpenModal={setCreateProjectModalOpen}/>}
            {editProjectModalOpen && <InputModal
                title={'Редактировать список'}
                placeholder={'Название списка'}
                setOpenModal={setEditProjectModalOpen}
                defaultValue={getTitle()}
                onSubmit={editProject}
            />}
        </div>
    );
}

export const enum ListType {
    sphere,
    project
}

export default TasksTabSuccessState;

