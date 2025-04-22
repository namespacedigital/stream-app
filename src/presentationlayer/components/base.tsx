import './../assets/styles/theme.scss';
import Header from './structure/header/header';
import Layout from './structure/layout/layout';
import Main from './structure/main/main';
import { Suspense } from 'react';
import OverlayLoader from './generic/loaders/overlay.loader';
import { useAtomValue } from '../../infrastructure/state/jotai';
import { moduleComponent, ModuleEnum } from '../../infrastructure/state/module';
import IptvPage from '../modules/iptv/iptv.page';
import MoviePage from '../modules/movie/movie.page';
import ConfigurationPage from '../modules/configuration/configuration.page';

// const IptvPage = lazy(() => import('../modules/iptv/iptv.page'));
// const MoviePage = lazy(() => import('../modules/movie/movie.page'));

export default function Base() {
  const moduleComponentState = useAtomValue(moduleComponent);

  return (
    <Layout>
      <Header />
      <Main>
        {moduleComponentState === ModuleEnum.IPTV && (
          <Suspense fallback={<OverlayLoader />}>
            <IptvPage />
          </Suspense>
        )}
        {moduleComponentState === ModuleEnum.MOVIE && (
          <Suspense fallback={<OverlayLoader />}>
            <MoviePage />
          </Suspense>
        )}
        {moduleComponentState === ModuleEnum.CONFIGURATION && (
          <Suspense fallback={<OverlayLoader />}>
            <ConfigurationPage />
          </Suspense>
        )}
      </Main>
    </Layout>
  );
}
