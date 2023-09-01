import { atom } from '../jotai';

export enum ModuleEnum {
  IPTV,
  MOVIE,
}

const moduleComponent = atom<ModuleEnum>(ModuleEnum.IPTV);

export { moduleComponent };
