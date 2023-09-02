import { atom } from '../jotai';
import { TvProgram } from '../../../domain/iptv/tv-program/TvProgram';

const tvProgram = atom<TvProgram>({ programName: '' });
export { tvProgram };
