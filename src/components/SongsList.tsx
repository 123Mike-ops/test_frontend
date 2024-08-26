/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchSongsRequest,deleteSongRequest,updateSongRequest } from '../features/songs/songsSlice';
import axios from 'axios';

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const SongsList: React.FC<{ songs: Song[], setSongs: React.Dispatch<React.SetStateAction<Song[]>> }> = ({ songs, setSongs }) => {
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedSong, setEditedSong] = useState<Partial<Song>>({});

  const handleEdit = (song: Song) => {
   if (song._id) {
    setEditingId(song._id);
    setEditedSong(song);
  } else {
    console.error("Song ID is missing");
  }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedSong({ ...editedSong, [name]: value });
  };

  const handleSave = () => {
    if (editingId) {
      dispatch(updateSongRequest({ ...editedSong, _id: editingId } as Song));
      setEditingId(null);
      setEditedSong({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id: any) => {
    dispatch(deleteSongRequest(id));
  };

  return (
    <div>
      <div css={tableHeader}>
        <div css={singleHeader}><span css={headerLabel}>Artist</span></div>
        <div css={singleHeader}><span css={headerLabel}>Title</span></div>
        <div css={singleHeader}><span css={headerLabel}>Genre</span></div>
        <div css={singleHeader}><span css={headerLabel}>Album</span></div>
        <div css={singleHeader}><span css={headerLabel}>Actions</span></div>
      </div>
      <ul css={tableBody}>
        {songs.map((song) => (
          <li key={song._id} css={tableRow}>
            {editingId === song._id ? (
              <>
                <div css={tableCell}>
                  <input
                    type="text"
                    name="artist"
                    value={editedSong.artist || ''}
                    onChange={handleChange}
                  />
                </div>
                <div css={tableCell}>
                  <input
                    type="text"
                    name="title"
                    value={editedSong.title || ''}
                    onChange={handleChange}
                  />
                </div>  
                <div css={tableCell}>
                  <input
                    type="text"
                    name="genre"
                    value={editedSong.genre || ''}
                    onChange={handleChange}
                  />
                </div>
                <div css={tableCell}>
                  <input
                    type="text"
                    name="album"
                    value={editedSong.album || ''}
                    onChange={handleChange}
                  />
                </div>
                <div css={tableCell}>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div css={tableCell}>{song.artist}</div>
                <div css={tableCell}>{song.title}</div>
                <div css={tableCell}>{song.genre}</div>
                <div css={tableCell}>{song.album}</div>
                <div css={tableCell}>
                  <button onClick={() => handleEdit(song)}>Edit</button>
                  <button onClick={() => handleDelete(song._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};


const singleHeader = css`
  padding: 10px;
`;

const headerLabel = css`
  font-size: 14px;
  color: #333;
`;

const tableBody = css`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const tableRow = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 20px;
  border-bottom: 1px solid #ccc;
`;

const tableCell = css`
  padding: 8px;
`;

const tableHeader = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  font-weight: bold;
  padding: 10px;
  background-color: #ddd;
`;

export default SongsList;
