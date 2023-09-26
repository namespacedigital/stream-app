import './movie.scss';
import { init } from '@noriginmedia/norigin-spatial-navigation';
import { Menu } from './components/menu/menu';
import { Content } from './components/movie-content/content';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { getMovies } from '../../../application/service/movie/movies/get-movies';
import { Movie } from '../../../domain/movie/movies/Movie';

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const rows = [
    {
      title: 'Toate Filmele',
      assets: movies,
    },

    {
      title: 'Filme noi',
      assets: movies,
    },
    // {
    //   title: 'Sport',
    //   assets: assets,
    // },
  ];

  init({
    // options
  });

  useEffect(() => {
    getMovies()
      .then((result) => {
        setMovies(result);
      })
      .catch((err: AxiosError) => {
        // setError({ status: err.status, message: err.message });
      });
  }, []);

  const menuItems = ['Filme', 'Seriale'];

  return (
    <div className='movie'>
      <Menu focusKey='MENU' items={menuItems} />
      <Content rows={rows} focusKey='CONTENT' />
    </div>
  );
}
