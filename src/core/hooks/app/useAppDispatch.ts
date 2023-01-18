import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../data/store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();