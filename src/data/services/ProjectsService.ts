import {db, firebaseApp} from "../firebase/firebase";
import TasksService from "./TasksService";
import {TaskModel} from "../../domain/models/TaskModel";
import {getAuth} from "firebase/auth";

export default class ProjectsService {
    static async create(name: string): Promise<void> {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/projects`;
        if (name.trim().length == 0 || name.trim() == 'inbox') return;
        await db.collection(collectionPath).add({name: name.trim()})
    }

    static async update(projectId: string, name: string): Promise<void> {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/projects`;
        if (name.trim().length == 0 || name.trim() == 'inbox') return;
        await db.collection(collectionPath).doc(projectId).update({name: name.trim()})
    }

    static async delete(projectId: string, tasks: TaskModel[]): Promise<void> {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/projects`;
        await db.collection(collectionPath).doc(projectId).delete();
        tasks.forEach((task) => {
            if (task.projectId == projectId) TasksService.delete(task.id);
        })
    }

    static async createInbox() {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/projects`;
        await db.collection(collectionPath).add({name: 'inbox'})
    }
}