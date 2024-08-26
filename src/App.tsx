/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SongsList from './components/SongsList';
import SongForm from './components/SongForm';
import { fetchSongsRequest } from './features/songs/songsSlice';
import { RootState } from './store';

export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector((state: RootState) => state.songs);
  const [localSongs, setLocalSongs] = useState<Song[]>(songs);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  // Update local state when Redux state changes
  useEffect(() => {
    setLocalSongs(songs);
  }, [songs]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div css={mainStyle}>
      <h1 css={headerStyle}>Songs</h1>
      <SongForm />
      <SongsList songs={localSongs} setSongs={setLocalSongs} />
    </div>
  );
};

const mainStyle = css`
  padding: 20px;
  background-color: #f7f7f7;
  display: flex;
`;

const headerStyle = css`
  font-weight: bold;
  color: gray;
`;

export default App;