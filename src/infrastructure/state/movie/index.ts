import { atom } from '../jotai';

const isMoviePaused = atom(false);
const isMovieOpened = atom(false);

const movieVideoPlayer = atom<any>(null);

export { isMoviePaused, isMovieOpened, movieVideoPlayer };
