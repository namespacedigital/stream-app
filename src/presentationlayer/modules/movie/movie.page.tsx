import './movie.scss';
import { init } from '@noriginmedia/norigin-spatial-navigation';
import { Menu } from './components/menu/menu';
import { Content } from './components/movie-content/content';
import { IAsset } from './components/movie-content/asset';

export const assets: IAsset[] = [
  {
    title: 'Asset 1',
    color: '#714ADD',
  },
  {
    title: 'Asset 2',
    color: '#AB8DFF',
  },
  {
    title: 'Asset 3',
    color: '#512EB0',
  },
  {
    title: 'Asset 4',
    color: '#714ADD',
  },
  {
    title: 'Asset 5',
    color: '#AB8DFF',
  },
  {
    title: 'Asset 6',
    color: '#512EB0',
  },
  {
    title: 'Asset 7',
    color: '#714ADD',
  },
  {
    title: 'Asset 8',
    color: '#AB8DFF',
  },
  {
    title: 'Asset 9',
    color: '#512EB0',
  },
];

const rows = [
  {
    title: 'Recommended',
    assets: assets,
  },
  {
    title: 'Movies',
    assets: assets,
  },
  {
    title: 'Series',
    assets: assets,
  },
  {
    title: 'TV Channels',
    assets: assets,
  },
  {
    title: 'Sport',
    assets: assets,
  },
];

export default function MoviePage() {
  init({
    // options
  });

  const menuItems = ['Filme', 'Seriale'];

  return (
    <div className='movie'>
      <Menu focusKey='MENU' items={menuItems} />
      <Content rows={rows} focusKey='CONTENT' />
    </div>
  );
}
