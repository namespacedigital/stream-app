import { httpAxios } from '../../../../../libs/httpclient/httpAxios';
import { APIS } from '../../../../../infrastructure/state/config';
import { Movie } from '../../../../../domain/movie/movies/Movie';

export async function getMovies(): Promise<Movie[]> {
  return await httpAxios.get<Movie[]>(APIS.API_URL + `/api/v1/movies`);
}
