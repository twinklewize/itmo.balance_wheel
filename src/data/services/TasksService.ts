import {db, firebaseApp} from "../firebase/firebase";
import {SubTaskModel} from "../../domain/models/TaskModel";
import {getAuth} from "firebase/auth";

export default class TasksService {
    static async createTask(name: string, projectId: string, spheresIds: string[], date: Date | null) {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/tasks`;
        if (name.trim().length == 0) return;
        await db.collection(collectionPath).add({
            name: name.trim(),
            projectId: projectId,
            spheresIds: spheresIds,
            date: date,
            isChecked: false,
            subTasks: [],
            description: '',
            createdAt: new Date(),
        })
    }


    static async checkTask(taskId: string, isChecked: boolean) {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/tasks`;
        await db.collection(collectionPath).doc(taskId).update({isChecked: isChecked});
    }

    static async updateName(taskId: string, name: string) {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/tasks`;
        await db.collection(collectionPath).doc(taskId).update({name: name});
    }

    static async updateDescription(taskId: string, description: string) {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/tasks`;
        await db.collection(collectionPath).doc(taskId).update({description: description});
    }

    static async updateProject(taskId: string, projectId: string) {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/tasks`;
        await db.collection(collectionPath).doc(taskId).update({projectId: projectId});
    }

    static async updateDate(taskId: string, date: Date | null) {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/tasks`;
        await db.collection(collectionPath).doc(taskId).update({date: date});
    }

    static async updateSubtasks(taskId: string, subTasks: SubTaskModel[]) {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/tasks`;
        await db.collection(collectionPath).doc(taskId).update({subTasks: subTasks});
    }

    static async updateSpheres(taskId: string, newSpheresIds: string[]) {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/tasks`;
        await db.collection(collectionPath).doc(taskId).update({spheresIds: newSpheresIds});
    }

    static async delete(taskId: string) {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/tasks`;
        await db.collection(collectionPath).doc(taskId).delete();
    }
}