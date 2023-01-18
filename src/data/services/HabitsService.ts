import {db, firebaseApp} from "../firebase/firebase";
import {HabitModel} from "../../domain/models/HabitModel";
import {getDateFromTimestamp, isSameDates} from "../../core/utils/DateUtils";
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";


export default class HabitsService {
    static async create(name: string, color: string, type: string, schedule: string): Promise<void> {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/habits`;
        if (name.trim().length == 0) return;
        await db.collection(collectionPath).add({
            name: name.trim(),
            color: color,
            type: type,
            schedule: schedule,
            startDate: new Date(),
            createdAt: new Date(),
            checkedDates: []
        })
    }

    static async update(habitId: string, name: string, color: string, type: string, schedule: string): Promise<void> {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/habits`;
        if (name.trim().length == 0) return;
        await db.collection(collectionPath).doc(habitId).update({
            name: name.trim(),
            color: color,
            type: type,
            schedule: schedule,
        })
    }

    static async check(habit: HabitModel, selectedDate: Date) {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/habits`;
        let checkedDate = habit.checkedDates.find(date => isSameDates(getDateFromTimestamp(date!), selectedDate));
        let newCheckedDates: (string | firebase.firestore.Timestamp | undefined)[];
        switch (!checkedDate) {
            case true:
                newCheckedDates = [...habit.checkedDates, selectedDate.toDateString()];
                break
            case false:
                newCheckedDates = habit.checkedDates.filter(date => date != checkedDate);
        }
        let parsedDates = newCheckedDates.map(date => getDateFromTimestamp(date));
        await db.collection(collectionPath).doc(habit.id).update({checkedDates: [...parsedDates]})
    }

    static async delete(habitId: string) {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/habits`;
        await db.collection(collectionPath).doc(habitId).delete()
    }
}

