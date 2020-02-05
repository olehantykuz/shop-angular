import { Observable, of } from 'rxjs';

export const serverErrorHandle = <T>(result?: T) => {
  return (error: any): Observable<T> => {
    console.error(error);

    return of(result as T);
  };
};
