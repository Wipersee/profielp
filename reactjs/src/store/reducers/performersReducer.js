const initialState = { performers: [] }

export const performersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PERFORMERS':
            return { ...state, performers: action.payload }
        default:
            return state
    }
}

export default performersReducer;