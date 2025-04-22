import { atom } from '../jotai';

export enum ModuleEnum {
  IPTV,
  MOVIE,
  CONFIGURATION,
}

const moduleComponent = atom<ModuleEnum>(ModuleEnum.IPTV);

export { moduleComponent };
