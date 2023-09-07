import { atom } from '../jotai';
import { TvProgram } from '../../../domain/iptv/tv-program/TvProgram';

const selectedTvProgram = atom<TvProgram>({ programName: '', count: 0 });
const tvPrograms = atom<TvProgram[]>([]);
export { selectedTvProgram, tvPrograms };
