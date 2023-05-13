import { ADDDATA, ADD_NEW_USER, DELETEDATA, GETDATA, GETERROR, LOADDATA, UPDATEDATA } from "../action/userActionType";

const init = {
    loading: false,
    error: false,
    userTask: [],
    newUser: []
}

const UserReducer = (store = init, { type, payload }) => {
    // console.log(payload)
    switch (type) {
        case LOADDATA:
            return {
                ...store,
                loading: true,
                error: false,
            }
        case GETDATA:
            return {
                ...store,
                loading: false,
                userTask: payload
            }
        case ADDDATA:
            return {
                ...store,
                loading: false,
                userTask: [...store.userTask, payload]
            }
        case GETERROR:
            return {
                ...store,
                loading: false,
                error: true,
            }

        case UPDATEDATA:
            return {
                ...store,
                loading: false,
                error: false,
                userTask: [...store.userTask, payload]
            }
        case DELETEDATA:
            let delTask = store.userTask.filter((e) => e.id !== payload);
            return {
                ...store,
                loading: false,
                error: false,
                userTask: delTask
            }
        case ADD_NEW_USER:
            console.log(payload)
            return {
                ...store,
                loading: false,
                error: false,
                newUser: [...store.newUser, payload]
            }

        default:
            return store;
    }
}

export default UserReducer;