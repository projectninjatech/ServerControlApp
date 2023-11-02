const initialState = {
    logoutStatus: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGOUT_STATUS':
            return { ...state, logoutStatus: action.status };
        default:
            return state;
    }
};

export default appReducer;