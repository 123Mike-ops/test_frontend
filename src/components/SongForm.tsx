/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSongRequest } from '../features/songs/songsSlice';

interface Song {
      _id?: string;
    title: string;
    artist: string;
    album: string;
    genre: string;

}



const SongForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');

  const dispatch = useDispatch();

 const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  const newSong: Song = { title, artist, album, genre }; 
  dispatch(createSongRequest(newSong));
};


  return (
    <form onSubmit={handleSubmit} css={mainStyle}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        css={input}
      />
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Artist"
        css={input}
      />
      <input
        type="text"
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
        placeholder="Album"
        css={input}
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Genre"
        css={input}
      />
      <button type="submit" css={submitButtom}>Add Song</button>
    </form>
  );
};

const mainStyle = css`
  padding: 20px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const input = css`
  height: 25px;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
`;

const submitButtom = css`
  width: 300px;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 20px;
  justify-content: center;
`;

export default SongForm;
