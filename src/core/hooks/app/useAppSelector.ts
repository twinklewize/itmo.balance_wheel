import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../../../data/store/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;