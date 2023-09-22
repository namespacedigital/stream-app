import './movie.scss';
import { init } from '@noriginmedia/norigin-spatial-navigation';
import { Menu } from './components/menu/menu';
import { Content } from './components/movie-content/content';
import { IAsset } from './components/movie-content/asset';

export const comedy: IAsset[] = [
  {
    title: 'John',
    color: '#714ADD',
  },
  {
    title: 'Star Wars',
    color: '#AB8DFF',
  },
  {
    title: 'Galaxy',
    color: '#512EB0',
  },
];

export const recommended: IAsset[] = [
  {
    title: 'Oscar',
    color: '#714ADD',
  },
  {
    title: 'True light',
    color: '#AB8DFF',
  },
  {
    title: 'Some of',
    color: '#512EB0',
  },
];

export const sf: IAsset[] = [
  {
    title: 'Equilibrium',
    color: '#714ADD',
  },
  {
    title: 'Star Trek',
    color: '#AB8DFF',
  },
  {
    title: 'War',
    color: '#512EB0',
  },
];

const rows = [
  {
    title: 'Recomandate',
    assets: recommended,
  },
  {
    title: 'Comedii',
    assets: comedy,
  },
  {
    title: 'SF',
    assets: sf,
  },
  // {
  //   title: 'TV Channels',
  //   assets: assets,
  // },
  // {
  //   title: 'Sport',
  //   assets: assets,
  // },
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
