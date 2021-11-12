export const userReducer = (state = JSON.parse(localStorage.getItem('user') === null ? '{}' : localStorage.getItem('user')), action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default userReducer;