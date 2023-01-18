import {PayloadAction} from '@reduxjs/toolkit';
import {createGenericSlice, GenericState, StateStatus} from './generic';
import {TaskModel} from "../../../domain/models/TaskModel";
import firebase from "firebase/compat/app";

interface TasksState {
    data: TaskModel[]
}

const initialState: TasksState = {
    data: []
};

const slice = createGenericSlice({
    name: 'tasks',
    initialState: initialState as GenericState<TaskModel[]>,
    reducers: {
        success: {
            reducer: (state, action: PayloadAction<TaskModel[]>) => {
                state.data = action.payload;
                state.status = StateStatus.Done;
            },
            prepare: (tasks: TaskModel[]) => {
                console.log(tasks);
                const mapped = tasks.map(n => {
                    return {
                        ...n,
                        date: !n.date ? undefined : (n.date as firebase.firestore.Timestamp).toDate().toDateString(),
                        createdAt: (n.createdAt as  firebase.firestore.Timestamp).toDate().toDateString()
                    }
                })
                return {payload: mapped};
            }
        }
    }
})

export const actions = slice.actions;

export default slice.reducer;