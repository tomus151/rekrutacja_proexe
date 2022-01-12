export const ADD_USER = 'ADD';
export const EDIT_USER = 'EDIT';
export const DELETE_USER = 'DELETE';
export const ADD_STATE = 'ADD_STATE';
export const addUser = ({ id, name, username, address, email }) => ({
    type: ADD_USER,
    payload: {
        id,
        name,
        username,
        address,
        email
    }
})
export const editUser = ({ id, name, username, address, email }) => ({
    type: EDIT_USER,
    payload: {
        id,
        name,
        username,
        address,
        email
    }
})
export const deleteUser = (id) => ({
    type: DELETE_USER,
    payload: {
        id
    }
})
export const addState = (state) => ({
    type: ADD_STATE,
    payload: {
        state
    }
})
