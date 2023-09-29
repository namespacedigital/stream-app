import './movie.scss';
import { init } from '@noriginmedia/norigin-spatial-navigation';
import { Menu } from './components/menu/menu';
import { Content } from './components/movie-content/content';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { getMovies } from '../../../application/service/movie/movies/get-movies';
import { Movie } from '../../../domain/movie/movies/Movie';
import { v4 as uuid } from 'uuid';
import MoviePlayer from './components/movie-player/movie-player';

type MovieError = {
  readonly status?: number;
  readonly message: string;
};
export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<MovieError | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null | undefined>();
  const rows = [
    {
      title: 'Toate Filmele',
      assets: movies,
    },
  ];

  init({
    // options
  });

  useEffect(() => {
    getMovies()
      .then((result) => {
        setMovies(
          result.map((movie): Movie => {
            return {
              ...movie,
              ...{ id: uuid() },
            };
          }),
        );
      })
      .catch((err: AxiosError) => {
        setError({ status: err.status, message: err.message });
      });
  }, []);

  const menuItems = ['Filme', 'Seriale'];

  const handleSelectMovie = (movie: Movie | null) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      {error !== null && (
        <span>
          {error.message} {error.status}
        </span>
      )}
      <div className='movie'>
        <Menu focusKey='MENU' items={menuItems} />
        <Content handleSelectMovie={handleSelectMovie} rows={rows} focusKey='CONTENT' />
        <MoviePlayer movie={selectedMovie} />
      </div>
    </>
  );
}
