import {PayloadAction} from '@reduxjs/toolkit';
import {createGenericSlice, GenericState, StateStatus} from './generic';
import {SphereModel} from "../../../domain/models/SphereModel";

interface SpheresState {
    data: SphereModel[]
}

const initialState: SpheresState = {
    data: []
};

const slice = createGenericSlice({
    name: 'spheres',
    initialState: initialState as GenericState<SphereModel[]>,
    reducers: {
        success: {
            reducer: (state, action: PayloadAction<SphereModel[]>) => {
                state.data = action.payload;
                state.status = StateStatus.Done;
            },
            prepare: (spheres: SphereModel[]) => {
                console.log(spheres);
                const mapped = spheres.map(n => {
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