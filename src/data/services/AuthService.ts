import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {removeUser, setUser} from "../store/slices/user.slice";
import SpheresService from "./SpheresService";
import ProjectsService from "./ProjectsService";
import {firebaseApp} from "../firebase/firebase";

export default class AuthService {
    static async createUser(email: string, password: string, dispatch: any) {
        const auth = getAuth(firebaseApp);
        return createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                }));
                SpheresService.createDefaultSpheres();
                ProjectsService.createInbox();
            })

    }

    static async login(email: string, password: string, dispatch: any) {
        const auth = getAuth(firebaseApp);
        return signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                }));
            })
    }

    static async logout(dispatch: any) {
        const auth = getAuth(firebaseApp);
        return signOut(auth).then(() => dispatch(removeUser()))
    }
}