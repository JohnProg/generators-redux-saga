import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'

import { counterReducer, userReducer, todosReducer } from './reducer';
import { logger, thunk } from './middleware';
import watchRequestAPI from './sagas';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(combineReducers({ counter: counterReducer, user: userReducer, todos: todosReducer }), applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(watchRequestAPI);

const counterElement = document.getElementById('counter');
const todoInput = document.getElementById('todo');
const todoList = document.getElementById('todoList');

const renderCounter = (state) => {
    counterElement.innerHTML = state.count.toString();
}

const renderList = (state) => {
    todoList.innerHTML = '';
    for (let i = 0; i < state.todos.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = state.todos[i];
        todoList.appendChild(li);
    }
    todoInput.value = '';
    todoInput.focus();
};

const renderUser = (state) => {
    console.log(state.user);
}

const render = () => {
    console.log('I\'m gonna render');
    const currentState = store.getState();

    renderCounter(currentState.counter);
    renderList(currentState.todos);
    renderUser(currentState.user);
};
render();
store.subscribe(render);

// Actions
document.getElementById('add').addEventListener('click', () => {
    store.dispatch({ type: 'ADD' });
});

document.getElementById('minus').addEventListener('click', () => {
    store.dispatch({ type: 'MINUS' });
});

document.getElementById('reset').addEventListener('click', () => {
    store.dispatch({ type: 'RESET' });
});

document.getElementById('new').addEventListener('click', () => {
    store.dispatch({ type: 'NEW', payload: todoInput.value });
});

document.getElementById('delete').addEventListener('click', () => {
    store.dispatch({ type: 'DELETE' });
});

document.getElementById('deleteAll').addEventListener('click', () => {
    store.dispatch({ type: 'DELETE_ALL' });
});

document.getElementById('fetchRequest').addEventListener('click', () => {
    debugger
    store.dispatch({ type: 'USER_FETCH_REQUESTED' });
    // store.dispatch(dispatch => {
    //     dispatch({ type: 'GET_USER' });
    //     axios.get('https://randomuser.me/api/')
    //         .then(response => {
    //             dispatch({ type: 'USER_RECIEVED', payload: response.data.results });
    //             console.log('results', response.data.results);
    //         })
    //         .catch(error => {
    //             dispatch({ type: 'ERROR', payload: error });
    //         });
    //     dispatch({ type: 'AFTER ASYNC ACTION' });
    // });
});


