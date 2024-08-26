import { all, call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';

import { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure, createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure, } from './features/songs/songsSlice';

axios.defaults.baseURL = 'http://localhost:7000';
interface Song {

  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface SongResponse {
  data: {
     MetaData: any; 
  Data: Song[];
   }
}

interface SongResponseCU {
  data: {
     MetaData: any; 
  Data: Song;
   }
}



function* fetchSongsSaga(): Generator<any, void, SongResponse> {
  try {
    const response: SongResponse = yield call(axios.get, '/v1/song/');
    yield put(fetchSongsSuccess(response.data.Data));
  } catch (error) {
    yield put(fetchSongsFailure('Failed to fetch songs'));
  }
}

function* createSongSaga(action: PayloadAction<Song>): Generator<any, void, SongResponseCU> {
  try {
    const response = yield call(axios.post, '/v1/song/', action.payload);

     yield put(createSongSuccess(response.data.Data));
    yield put(fetchSongsRequest());
   
  } catch (error) {
    yield put(createSongFailure('Failed to create song'));
  }
}


function* updateSongSaga(action: PayloadAction<Song>): Generator<any, void, SongResponseCU> {
  try {
    const response = yield call(axios.patch, `/v1/song/${action.payload._id}`, action.payload);
  
    yield put(updateSongSuccess(response.data.Data));
  } catch (error) {
    yield put(updateSongFailure('Failed to update song'));
  }
}

function* deleteSongSaga(action: PayloadAction<string>): Generator<any, void, void> {
  try {
    yield call(axios.delete, `/v1/song/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(deleteSongFailure('Failed to delete song'));
  }
}

function* rootSaga(): Generator<any, void, unknown> {
  yield all([
    takeEvery(fetchSongsRequest.type, fetchSongsSaga),
    takeEvery(createSongRequest.type, createSongSaga),
    takeEvery(updateSongRequest.type, updateSongSaga),
    takeEvery(deleteSongRequest.type, deleteSongSaga),
  ]);
}



export default rootSaga;
