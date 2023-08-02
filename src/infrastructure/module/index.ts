import { atom } from "../state/jotai";

export enum ModuleEnum {
    IPTV,
    MOVIE
  }

const moduleComponent = atom<ModuleEnum>(ModuleEnum.IPTV);

export {moduleComponent}