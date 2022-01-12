import { ADD_USER, EDIT_USER, DELETE_USER, ADD_STATE } from '../actions/appActions'
const appReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_STATE:
            return action.payload.state;
        case ADD_USER:
            return [...state, action.payload];
        case EDIT_USER:
            return state.map(user => {
                if (user.id !== action.payload.id) {
                    return user;
                }
                const { name, email, address, username } = action.payload;
                return ({
                    id: user.id,
                    name,
                    username,
                    address,
                    email,
                })
            });
        case DELETE_USER:
            return state.filter(user => user.id !== action.payload.id);
        default:
            return state;
    }
}
export default appReducer;