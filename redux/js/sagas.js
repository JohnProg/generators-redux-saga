import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchuser(action) {
    try {
        const response = yield axios.get('https://randomuser.me/api/');
        yield put({ type: 'USER_FETCH_SUCCEEDED', user: response.data.results[0] });
    } catch (error) {
        yield put({ type: 'USER_FETCH_FAILED', message: error.message });
    }
}

function* watchRequestAPI() {
    yield takeLatest('USER_FETCH_REQUESTED', fetchuser);
}

export default watchRequestAPI;