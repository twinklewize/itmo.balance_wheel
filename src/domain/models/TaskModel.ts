import firebase from "firebase/compat/app";

export interface TaskModel {
    id: string;
    name: string,
    description: string;
    isChecked: boolean;
    subTasks: SubTaskModel[];
    projectId?: string;
    spheresIds: string[];
    date?: string | firebase.firestore.Timestamp;
    createdAt?: string | firebase.firestore.Timestamp;
}

export interface SubTaskModel {
    isChecked: boolean;
    name: string;
}