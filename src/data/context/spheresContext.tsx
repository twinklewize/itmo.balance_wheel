import React, {createContext, ReactNode, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useAppSelector} from "../../core/hooks/app/useAppSelector";
import {StateStatus} from "../store/slices/generic";
import {useFirestore} from "../../core/hooks/firestore";
import {actions} from "../store/slices/spheres.slice";
import {SphereModel} from "../../domain/models/SphereModel";
import {getAuth} from "firebase/auth";
import {firebaseApp} from "../firebase/firebase";

interface ISpheresContext {
    spheres: SphereModel[],
    isLoading: boolean,
    errors: any,
}

const defaultState: ISpheresContext = {
    spheres: [],
    isLoading: false,
    errors: undefined,
};

export const SpheresContext = createContext(defaultState);

export const SpheresProvider = ({ children }:{children: ReactNode}) => {
    const userId = getAuth(firebaseApp).currentUser?.uid;
    const {spheres, isLoading, errors} = useAppSelector((state) => ({
        spheres: state.spheres.data,
        isLoading: state.spheres.status === StateStatus.Loading,
        errors: state.spheres.errors
    }));

    const firestore = useFirestore<SphereModel[]>(`users/${userId}/spheres`);
    useEffect(() => {
        firestore.collection(actions, {listen: true});
    }, [])

    let state = {
        spheres: spheres ?? [],
        isLoading: isLoading,
        errors: errors,
    }

    return (
        <SpheresContext.Provider value={state}>
            {children}
        </SpheresContext.Provider>
    );
};

export const useSpheresContext = () => useContext(SpheresContext);

SpheresProvider.propTypes = {
    children: PropTypes.node.isRequired,
};