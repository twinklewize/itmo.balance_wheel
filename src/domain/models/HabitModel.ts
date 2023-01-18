import firebase from "firebase/compat/app";

export interface SimpleHabitModel {
    id: string;
    name: string;
    color: any;
    isChecked: boolean;
    onCheck: () => void
}

export interface HabitModel {
    id: string;
    name: string;
    color: string;
    type: string;
    schedule: string;
    checkedDates: (string | firebase.firestore.Timestamp | undefined)[];
    startDate: string | firebase.firestore.Timestamp | null;
    createdAt: string | firebase.firestore.Timestamp | null;
}