import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPlan() {
    try {
        const response = yield axios.get('/api/plan');
        yield put({ type: 'SET_PLAN', payload: response.data });
    } catch (error) {
        console.log('Error in getPlan saga', error);
    }
}

function* createTask(action) {
    try {
        yield axios.post('/api/plan', action.payload)
        yield put({ type: 'GET_PLAN' })

    }
    catch (error) {
        console.log('Error in createTask saga', error);
    }
}
function* getPlanSaga() {
    yield takeLatest('GET_PLAN', getPlan);
    yield takeLatest('CREATE_TASK', createTask);
}

export default getPlanSaga;