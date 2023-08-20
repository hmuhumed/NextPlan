import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPlan(action) {
    try {
        const response = yield axios.get('/api/plan');
        yield put({ type: 'SET_PLAN', payload: response.data });
    } catch (error) {
        console.log('Error in getPlan saga', error);
    }
}