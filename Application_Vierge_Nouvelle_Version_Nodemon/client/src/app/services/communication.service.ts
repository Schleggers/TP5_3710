import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, throwError } from "rxjs";
import { Medecin } from "../intefaces/medecin";
import { Service } from "../intefaces/service";

@Injectable()
export class CommunicationService {
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
    return this.http.get<Medecin[]>(`${this.BASE_URL}/medecins`).pipe(catchError(this.handleError));
  }

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.BASE_URL}/services`).pipe(catchError(this.handleError));
  }

  addMedecins(medecin: Medecin): Observable<unknown> {
    return this.http.post(`${this.BASE_URL}/medecins`, medecin).pipe(catchError(this.handleError));
  }

  modifyMedecin(medecin: Medecin): Observable<unknown> {
    return this.http.patch(`${this.BASE_URL}/medecins`, medecin).pipe(catchError(this.handleError));
  }

  deleteMedecin(id: number): Observable<unknown> {
    return this.http.delete(`${this.BASE_URL}/medecins/${id}`).pipe(catchError(this.handleError));
  }

  // À DÉCOMMENTER ET À UTILISER LORSQUE VOTRE COMMUNICATION EST IMPLÉMENTÉE
  private handleError<T>(error: T) {
    return throwError(() => error);
  }

}
