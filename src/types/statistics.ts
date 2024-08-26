
export interface SongByGenre {
  _id: string;
  count: number;
}

export interface SongsAndAlbumsByArtist {
  _id: string;
  totalSongs: number;
  totalAlbums: number;
}

export interface SongsInAlbum {
  _id: string | null;
  count: number;
}

export interface StatisticsResponse {
  MetaData: Record<string, any>;
  Data: {
    totalSongs: number;
    totalArtists: number;
    totalAlbums: number;
    totalGenres: number;
    songsByGenre: SongByGenre[];
    songsAndAlbumsByArtist: SongsAndAlbumsByArtist[];
    songsInAlbum: SongsInAlbum[];
  };
}
