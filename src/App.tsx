/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SongsList from './components/SongsList';
import SongForm from './components/SongForm';
import Statistic from './components/Statistic';
import { fetchSongsRequest } from './features/songs/songsSlice';
import { RootState } from './store';
import axios from 'axios';
import { StatisticsResponse } from '../src/types/statistics';
axios.defaults.baseURL = 'http://localhost:7000';
export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export const fetchStatistics = async (): Promise<StatisticsResponse> => {
  try {
    const response = await axios.get<StatisticsResponse>('/v1/song/stat/all'); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector((state: RootState) => state.songs);
  const [localSongs, setLocalSongs] = useState<Song[]>(songs);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  useEffect(() => {
    setLocalSongs(songs);
  }, [songs]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div css={mainStyle}>
      <h1 css={headerStyle}>Songs</h1>
        <div css={ upper}>
          <SongForm />
          <SongsList songs={localSongs} setSongs={setLocalSongs} />
        </div>
         <div>
           <Statistic />
          </div>
    </div>
  );
};

const mainStyle = css`
  padding: 20px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction:column;
`;
const upper = css`
  padding: 20px;
  background-color: #f7f7f7;
  display: flex;

`;

const headerStyle = css`
  font-weight: bold;
  color: gray;
`;

export default App;