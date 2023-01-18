import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import tasksReducer from './slices/tasks.slice';
import projectsReducer from './slices/projects.slice';
import habitsReducer from './slices/habits.slice';
import spheresReducer from './slices/spheres.slice';
import userReducer from './slices/user.slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        tasks: tasksReducer,
        habits: habitsReducer,
        projects: projectsReducer,
        spheres: spheresReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;