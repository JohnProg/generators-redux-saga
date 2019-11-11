export function counterReducer(state = { count: 0 }, action) {
    switch (action.type) {
        case 'ADD':
            return { ...state, count: state.count + 1 };
        case 'MINUS':
            return { ...state, count: state.count - 1 };
        case 'RESET':
            return { ...state, count: 0 };
        default:
            return state;
    }
}

export function todosReducer(state = { todos: [] }, action) {
    let nextState = { ...state }
    switch (action.type) {
        case 'NEW':
            nextState.todos = [...state.todos, action.payload];
            return nextState;
        case 'DELETE':
            nextState.todos.pop();
            return nextState;
        case 'DELETE_ALL':
            nextState.todos = [];
            return nextState;
        default:
            return state;
    }
}

export function userReducer(state = {}, action) {
    switch (action.type) {
        case 'USER_FETCH_SUCCEEDED':
            return {
                ...state,
                user: action.user,
            };
        case 'USER_FETCH_FAILED':
            return {
                ...state,
                error: action.message,
            };
        default:
            return state;
    }
}