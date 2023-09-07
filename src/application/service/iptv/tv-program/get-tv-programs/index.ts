import { httpAxios } from '../../../../../libs/httpclient/httpAxios';
import { TvProgram } from '../../../../../domain/iptv/tv-program/TvProgram';
import { APIS } from '../../../../../infrastructure/state/config';

export async function getTvPrograms(): Promise<TvProgram[]> {
  return await httpAxios.get<TvProgram[]>(APIS.API_URL + `/api/v1/tvPrograms`);
}
