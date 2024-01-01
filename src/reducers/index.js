//Этот js сводит все редьюзеры в один
import { combineReducers } from "redux";
import posts from "./posts";
import regions from "./regions";

const rootReducers = combineReducers({
    posts,
    regions,
});

export default rootReducers;