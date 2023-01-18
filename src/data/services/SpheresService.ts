import {db, firebaseApp} from "../firebase/firebase";
import TasksService from "./TasksService";
import {TaskModel} from "../../domain/models/TaskModel";
import {removeItem} from "../../core/utils/removeItem";
import {SphereModel} from "../../domain/models/SphereModel";
import {getAuth} from "firebase/auth";

export default class SpheresService {
    static async create(name: string, color: string, icon: string): Promise<void> {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/spheres`;
        if (name.trim().length == 0) return;
        await db.collection(collectionPath)
            .add({
                name: name.trim(),
                color: color,
                icon: icon,
                satisfaction: 1,
            })
    }

    static async update(sphereId: string, name: string, color: string, icon: string): Promise<void> {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/spheres`;
        if (name.trim().length == 0) return;
        await db.collection(collectionPath).doc(sphereId).update({
            name: name.trim(),
            color: color,
            icon: icon,
        })
    }



    static async updateSatisfaction(sphereId: string, newValue: number): Promise<void> {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/spheres`;
        if (newValue < 1 || newValue > 10) return;
        await db.collection(collectionPath)
            .doc(sphereId)
            .update({satisfaction: newValue})
    }

    static async delete(sphereId: string, tasks: TaskModel[], spheres: SphereModel[]): Promise<void> {
        let userId = getAuth(firebaseApp).currentUser?.uid;
        let collectionPath = `mode/development/users/${userId}/spheres`;
        if (spheres.length <= 2) return;
        await db.collection(collectionPath).doc(sphereId).delete()
        tasks.forEach((task) => {
            if (task.spheresIds.includes(sphereId)) {
                let newSpheres = removeItem([...task.spheresIds], sphereId);
                TasksService.updateSpheres(task.id, newSpheres);
            }
        })
    }

    static async createDefaultSpheres(){
        defaultSpheres.forEach(sphere => {this.create(sphere.name, sphere.color, sphere.icon)})
    }
}

const defaultSpheres = [
    {
        icon: 'heart',
        name: 'Здоровье',
        color: '#EC8C77',
    },
    {
        icon: 'book',
        name: 'Саморазвитие',
        color: '#ECAF77',
    },
    {
        icon: 'tv',
        name: 'Развлечения',
        color: '#ECEB77',
    },
    {
        icon: 'github',
        name: 'Семья',
        color: '#77EC7C',
    },
    {
        icon: 'briefcase',
        name: 'Работа',
        color: '#75EACE',
    },
    {
        icon: 'archive',
        name: 'Деньги',
        color: '#75EAE3',
    },
    {
        icon: 'camera',
        name: 'Хобби',
        color: '#75B9EA',
    },
    {
        icon: 'users',
        name: 'Друзья',
        color: '#7596EA',
    }
]