import React, {createContext, ReactNode, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useAppSelector} from "../../core/hooks/app/useAppSelector";
import {StateStatus} from "../store/slices/generic";
import {useFirestore} from "../../core/hooks/firestore";
import {actions} from "../store/slices/habits.slice";
import {HabitModel} from "../../domain/models/HabitModel";
import {firebaseApp} from "../firebase/firebase";
import {getAuth} from "firebase/auth";

interface IHabitsContext {
    habits: HabitModel[],
    isLoading: boolean,
    errors: any,
}

const defaultState: IHabitsContext = {
    habits: [],
    isLoading: false,
    errors: undefined,
};

export const HabitsContext = createContext(defaultState);

export const HabitsProvider = ({children}: { children: ReactNode }) => {
    const userId = getAuth(firebaseApp).currentUser?.uid;

    const {habits, isLoading, errors} = useAppSelector((state) => ({
        habits: state.habits.data,
        isLoading: state.habits.status === StateStatus.Loading,
        errors: state.habits.errors
    }));

    const firestore = useFirestore<HabitModel[]>(`users/${userId}/habits`);

    useEffect(() => {
        firestore.collection(actions, {listen: true});
    }, [])

    let state = {
        habits: habits ?? [],
        isLoading: isLoading,
        errors: errors,
    }

    return (
        <HabitsContext.Provider value={state}>
            {children}
        </HabitsContext.Provider>
    );
};

export const useHabitsContext = () => useContext(HabitsContext);

HabitsProvider.propTypes = {
    children: PropTypes.node.isRequired,
}