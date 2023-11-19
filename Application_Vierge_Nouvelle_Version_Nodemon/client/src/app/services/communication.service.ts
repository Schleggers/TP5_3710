// À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
// import { HttpClient } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, of } from "rxjs";
import { Medecin } from "../intefaces/medecin";

@Injectable()
export class CommunicationService {
  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  getAllMedecins(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(`${this.BASE_URL}/medecins`).pipe(catchError(this.handleError(`${this.BASE_URL}/medecins`, [])));
  }

  addMedecins(medecin: Medecin): Observable<unknown> {
    return this.http.post(`${this.BASE_URL}/medecins`, medecin).pipe(catchError(this.handleError(`${this.BASE_URL}/medecins`, [])));
  }

  modifyMedecin(medecin: Medecin): Observable<unknown> {
    return this.http.patch(`${this.BASE_URL}/medecins`, medecin).pipe(catchError(this.handleError(`${this.BASE_URL}/medecins`, [])));
  }

  deleteMedecin(id: number): Observable<unknown> {
    return this.http.delete(`${this.BASE_URL}/medecins/${id}`).pipe(catchError(this.handleError(`${this.BASE_URL}/medecins`, [])));
  }

  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
