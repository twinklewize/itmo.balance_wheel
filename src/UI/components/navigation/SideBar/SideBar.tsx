import React, {CSSProperties, useEffect} from "react";
import {Inbox, List, PieChart, PlusCircle, Tag, X} from "react-feather";
import classes from './SideBar.module.scss';
import Avatar from "../../UIKit/special/Avatar/Avatar";
import IconButton from "../../UIKit/buttons/IconButton/IconButton";
import Accordion from "../../UIKit/containers/Accordion/Accordion";
import {Link} from "react-router-dom";
import IconFromText from "../../../../core/utils/IconFromText";
import getProjectName from "../../../../core/utils/getProjectName";
import {ListType} from "../../tabs/TasksTab/TasksTabSuccessState";
import {useProjectsValue} from "../../../../data/context/projectsContext";
import {useSpheresContext} from "../../../../data/context/spheresContext";

export default function SideBar({
                                    setActive,
                                    setCurrentListType,
                                    setCurrentListId,
                                    setCreateProjectModalOpen,
                                }: {
    setActive: () => void;
    setCurrentListType: React.Dispatch<React.SetStateAction<ListType>>,
    setCurrentListId: React.Dispatch<React.SetStateAction<string>>,
    setCreateProjectModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    let projects = useProjectsValue().projects;
    let spheres = useSpheresContext().spheres
    const [backgroundStyle, setBackgroundStyle] = React.useState<CSSProperties>({});
    const [sidebarStyle, setSidebarStyle] = React.useState<CSSProperties>({});
    const userProjects = projects.filter(p => p.name != 'inbox');

    useEffect(() => {
        document.body.style.overflow = "hidden";
        setBackgroundStyle({opacity: 1});
        setSidebarStyle({left: 0});
    }, [])

    const handleClose = () => {
        document.body.style.overflow = ""
        setSidebarStyle({left: "-100%", transition: "850ms"});
        setBackgroundStyle({opacity: 0});
        setTimeout(() => {
            setActive();
        }, 350);
    }

    function handleProjectClick(projectId: string) {

        setCurrentListId(projectId);
        setCurrentListType(ListType.project);
        handleClose();
    }

    function handleSphereClick(sphereId: string) {
        setCurrentListId(sphereId);
        setCurrentListType(ListType.sphere)
        handleClose()
    }

    function handleInboxClick() {
        setCurrentListId(projects.filter((project) => project.name === 'inbox')[0].id);
        setCurrentListType(ListType.project);
        handleClose()
    }

    return (
        <>
            <div className={classes.background} style={backgroundStyle} onClick={handleClose}></div>
            <nav className={classes.sidebar} style={sidebarStyle}>
                <div className={classes.sidebarContent}>
                    <div className={classes.sideBarItems}>
                        <div className={classes.header}>
                            <div className={classes.headerContent}>
                                <Link to={'/settings'} className={classes.nameAndAvatar}>
                                    <Avatar/>
                                    <p className={classes.name}>Anita Preece</p>
                                </Link>
                                <IconButton onClick={handleClose}><X/></IconButton>
                            </div>
                        </div>
                        <button className={classes.listElementWithPadding} onClick={handleInboxClick}>
                            <Inbox className={classes.icon}/>
                            <p>Не отсортировано</p>
                        </button>
                        {spheres.length != 0 && <Accordion horizontalPadding={24} height={40} title={
                            <div className={classes.defaultListElement}>
                                <PieChart className={classes.icon}/>
                                <p>Сферы жизни</p>
                            </div>}>
                            {spheres.map((sphere) =>
                                <button className={classes.subListElement}
                                        key={sphere.id}
                                        onClick={() => handleSphereClick(sphere.id)}>
                                    <div className={classes.icon}>
                                        <IconFromText text={sphere.icon}/>
                                    </div>
                                    <p>{sphere.name}</p>
                                </button>
                            )}
                        </Accordion>}
                        {userProjects.length != 0 && < Accordion horizontalPadding={24} height={40} title={
                            <div className={classes.defaultListElement}>
                                <Tag className={classes.icon}/>
                                <p>Списки</p>
                            </div>}>
                            {userProjects.map((project) =>
                                <button className={classes.subListElement}
                                        key={project.id}
                                        onClick={() => handleProjectClick(project.id)}>
                                    <List className={classes.icon}/>
                                    <p>{getProjectName(project.name)}</p>
                                </button>
                            )}
                        </Accordion>}
                    </div>
                    <div className={classes.bottomButton}>
                        <button className={classes.listElementWithPadding}
                                onClick={() => setCreateProjectModalOpen(true)}>
                            <PlusCircle className={classes.icon}/>
                            <p>Добавить список</p>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}
