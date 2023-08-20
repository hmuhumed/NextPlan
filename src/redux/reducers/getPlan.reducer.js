const getPlanReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PLAN':
            return action.payload;
        default: 
            return state; 
    }
}

export default getPlanReducer;