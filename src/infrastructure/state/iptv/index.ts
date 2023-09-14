import { atom } from '../jotai';
import { TvProgram } from '../../../domain/iptv/tv-program/TvProgram';

const selectedTvProgram = atom<TvProgram>({ programName: 'PRO TV HD', count: 0 });
const tvPrograms = atom<string[]>([]);
export { selectedTvProgram, tvPrograms };
