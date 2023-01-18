import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useAppSelector} from "../../core/hooks/app/useAppSelector";
import {StateStatus} from "../store/slices/generic";
import {useFirestore} from "../../core/hooks/firestore";
import {ProjectModel} from "../../domain/models/ProjectModel";
import {actions} from "../store/slices/projects.slice";
import {getAuth} from "firebase/auth";
import {firebaseApp} from "../firebase/firebase";

interface IProjectsContext {
    projects: ProjectModel[],
    isLoading: boolean,
    errors: any,
    inboxId: string,
}

const defaultState: IProjectsContext = {
    projects: [],
    isLoading: false,
    errors: undefined,
    inboxId: '',
};

export const ProjectsContext = createContext(defaultState);

export const ProjectsProvider = ({ children }:{children: ReactNode}) => {
    const userId = getAuth(firebaseApp).currentUser?.uid;
    const {projects, isLoading, errors} = useAppSelector((state) => ({
        projects: state.projects.data,
        isLoading: state.projects.status === StateStatus.Loading,
        errors: state.projects.errors
    }));
    const firestore = useFirestore<ProjectModel[]>(`users/${userId}/projects`);
    useEffect(() => {
        firestore.collection(actions, {listen: true});
    }, [])

    let state = {
        projects: projects ?? [],
        isLoading: isLoading,
        errors: errors,
        inboxId: projects?.find(p => p.name === 'inbox')?.id ?? '',
    }

    return (
        <ProjectsContext.Provider value={state}>
            {children}
        </ProjectsContext.Provider>
    );
};

export const useProjectsValue = () => useContext(ProjectsContext);

ProjectsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};