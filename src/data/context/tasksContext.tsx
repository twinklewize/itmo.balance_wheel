import React, {createContext, ReactNode, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useAppSelector} from "../../core/hooks/app/useAppSelector";
import {StateStatus} from "../store/slices/generic";
import {useFirestore} from "../../core/hooks/firestore";
import {actions} from "../store/slices/tasks.slice";
import {TaskModel} from "../../domain/models/TaskModel";
import {getAuth} from "firebase/auth";
import {firebaseApp} from "../firebase/firebase";

interface ITasksContext {
    tasks: TaskModel[],
    isLoading: boolean,
    errors: any,
}

const defaultState: ITasksContext = {
    tasks: [],
    isLoading: false,
    errors: undefined,
};

export const TasksContext = createContext(defaultState);

export const TasksProvider = ({ children }:{children: ReactNode}) => {
    const userId = getAuth(firebaseApp).currentUser?.uid;
    const {tasks, isLoading, errors} = useAppSelector((state) => ({
        tasks: state.tasks.data,
        isLoading: state.tasks.status === StateStatus.Loading,
        errors: state.tasks.errors
    }));

    const firestore = useFirestore<TaskModel[]>(`users/${userId}/tasks`);
    useEffect(() => {
        firestore.collection(actions, {listen: true});
    }, [])

    let state = {
        tasks: tasks ?? [],
        isLoading: isLoading,
        errors: errors,
    }

    return (
        <TasksContext.Provider value={state}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasksContext = () => useContext(TasksContext);

TasksProvider.propTypes = {
    children: PropTypes.node.isRequired,
};