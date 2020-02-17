import { Observable, of } from 'rxjs';

export const serverErrorHandle = <T>(result?: T) => {
  return (error: any): Observable<T> => {
    return of(result as T);
  };
};
