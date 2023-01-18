import {ReactNode} from "react";
import firebase from "firebase/compat/app";

export interface SphereModel {
    id: string;
    name: string;
    satisfaction: number;
    icon: string;
    color: string;
}