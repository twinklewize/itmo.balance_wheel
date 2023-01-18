import {PayloadAction} from '@reduxjs/toolkit';
import {createGenericSlice, GenericState, StateStatus} from './generic';
import {ProjectModel} from "../../../domain/models/ProjectModel";

interface ProjectsState {
    data: ProjectModel[]
};

const initialState: ProjectsState = {
    data: []
};

const slice = createGenericSlice({
    name: 'projects',
    initialState: initialState as GenericState<ProjectModel[]>,
    reducers: {
        success: {
            reducer: (state, action: PayloadAction<ProjectModel[]>) => {
                state.data = action.payload;
                state.status = StateStatus.Done;
            },
            prepare: (projects: ProjectModel[]) => {
                console.log(projects);
                const mapped = projects.map(n => {
                    return {
                        ...n,
                        // createdAt: (n.createdAt as  firebase.firestore.Timestamp).toDate().toDateString()
                    }
                })
                return {payload: mapped};
            }
        }
    }
})

export const actions = slice.actions;

export default slice.reducer;