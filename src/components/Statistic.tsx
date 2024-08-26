
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { fetchStatistics } from '../App';
import { StatisticsResponse } from '../types/statistics';

const Statistic: React.FC = () => {
  const [statistics, setStatistics] = useState<StatisticsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const data = await fetchStatistics();
        setStatistics(data);
      } catch (error) {
        setError('Failed to fetch statistics.');
      } finally {
        setLoading(false);
      }
    };

    loadStatistics();
  }, []);



  if (!statistics) return <p>No data available.</p>;

  const { totalSongs, totalArtists, totalAlbums, totalGenres, songsByGenre, songsAndAlbumsByArtist, songsInAlbum } = statistics.Data;

  return (
    <div css={containerStyle}>
      <h2 css={titleStyle}>Statistics</h2>
      <div css={sectionStyle}>
        <p>Total Songs: {totalSongs}</p>
        <p>Total Artists: {totalArtists}</p>
        <p>Total Albums: {totalAlbums}</p>
        <p>Total Genres: {totalGenres}</p>
      </div>
      <div css={sectionStyle}>
        <h3 css={subtitleStyle}>Songs by Genre</h3>
        <ul>
          {songsByGenre.map((item) => (
            <li key={item._id}>{item._id}: {item.count}</li>
          ))}
        </ul>
      </div>
      <div css={sectionStyle}>
        <h3 css={subtitleStyle}>Songs and Albums by Artist</h3>
        <ul>
          {songsAndAlbumsByArtist.map((item) => (
            <li key={item._id}>{item._id} - Songs: {item.totalSongs}, Albums: {item.totalAlbums}</li>
          ))}
        </ul>
      </div>
      <div css={sectionStyle}>
        <h3 css={subtitleStyle}>Songs in Album</h3>
        <ul>
          {songsInAlbum.map((item) => (
            <li key={item._id || 'no-id'}>{item._id || 'Unknown'}: {item.count}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const containerStyle = css`
  padding: 20px;
  background-color: #f7f7f7;
  display:flex;
  flex-wrap:wrap;
  justify-content:space-evenly;
`;

const titleStyle = css`
  font-size: 24px;
  font-weight: bold;
`;

const sectionStyle = css`
  margin-bottom: 20px;
`;

const subtitleStyle = css`
  font-size: 18px;
  font-weight: bold;
`;

export default Statistic;
