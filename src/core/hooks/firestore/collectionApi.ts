import { MutableRefObject} from 'react';
import { QueryDocumentSnapshot, DocumentData, Query } from '@firebase/firestore-types';
import { ListenerState } from './index';
import {CollectionOptions} from "../../../data/firebase/queryOptions";
import {AppDispatch} from "../../../data/store/store";
import {GenericActions} from "../../../data/store/slices/generic";

const collectionApi = <T>(
    query: Query,
    actions: GenericActions<T>,
    dispatch: AppDispatch,
    collectionListenersRef: MutableRefObject<ListenerState[]>,
    lastDocRef: MutableRefObject<QueryDocumentSnapshot<DocumentData> | undefined>,
    options?: CollectionOptions
) => {
    dispatch(actions.loading());
    if (options && options?.listen) {
        const listener = query.onSnapshot(
            querySnapshot => {
                const data: DocumentData[] = [];
                if (querySnapshot.empty) {
                    dispatch(actions?.success([] as unknown as T));
                    return;
                }
                querySnapshot.forEach(doc =>
                    data.push({ id: doc.id, ...doc.data() })
                );
                console.log('test', data);
                dispatch(actions?.success(data as unknown as T));
                if (options.lazyLoad) {
                    lastDocRef.current = querySnapshot.docs[querySnapshot.docs.length - 1];
                }
            },
            error => {
                dispatch(actions?.error(error.message));
                console.log('collection streaming error', error.message);
            }
        );
        collectionListenersRef.current.push({name: options.listenerName, unsubscribe: listener});
    } else {
        query
            .get()
            .then(querySnapshot => {
                const data: T[] = [];
                querySnapshot.forEach(doc =>
                    data.push(({ id: doc.id, ...doc.data() } as unknown) as T)
                );
                dispatch(actions?.success((data as unknown) as T));
                if (options && options.lazyLoad) {
                    lastDocRef.current = querySnapshot.docs[querySnapshot.docs.length - 1];
                }
            })
            .catch(error => {
                console.log('collection get error', error.message);
                dispatch(actions?.error(error.message));
            });
    }

}

export default collectionApi;