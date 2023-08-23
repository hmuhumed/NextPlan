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

function* updateTask(action) {
    try {
        console.log('in updateTask saga', action.payload);
        yield axios.put(`/api/plan/${action.payload}`);
        yield put({ type: 'GET_PLAN' });
    }
    catch (error) {
        console.log('Error in updateTask saga', error);
    }
}

function* deleteTask(action) {
    try {
        yield axios.delete(`/api/plan/${action.payload}`);
        yield put({ type: 'GET_PLAN' });
    } catch(error) {
        console.log("Error in deleteTask saga", error);
    }
}

function* getPlanSaga() {
    yield takeLatest('GET_PLAN', getPlan);
    yield takeLatest('CREATE_TASK', createTask);
    yield takeLatest('UPDATE_TASK', updateTask);
    yield takeLatest('DELETE_TASK', deleteTask);
}

export default getPlanSaga;