import {PayloadAction} from '@reduxjs/toolkit';
import {createGenericSlice, GenericState, StateStatus} from './generic';
import {HabitModel} from "../../../domain/models/HabitModel";
import firebase from "firebase/compat/app";

interface ProjectsState {
    data: HabitModel[]
};

const initialState: ProjectsState = {
    data: []
};

const slice = createGenericSlice({
    name: 'habits',
    initialState: initialState as GenericState<HabitModel[]>,
    reducers: {
        success: {
            reducer: (state, action: PayloadAction<HabitModel[]>) => {
                state.data = action.payload;
                state.status = StateStatus.Done;
            },
            prepare: (habits: HabitModel[]) => {
                const mapped = habits.map(n => {
                    return {
                        ...n,
                        startDate: (n.createdAt as firebase.firestore.Timestamp).toDate().toDateString(),
                        checkedDates: (n.checkedDates as firebase.firestore.Timestamp[]).map((date) => date.toDate().toDateString()),
                        createdAt: (n.createdAt as firebase.firestore.Timestamp).toDate().toDateString()
                    }
                })
                console.log(mapped);
                return {payload: mapped};
            }
        }
    }
})
export const actions = slice.actions;

export default slice.reducer;