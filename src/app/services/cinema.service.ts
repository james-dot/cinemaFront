import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  public host : string ="http://localhost:8080";//au moment de deploiement en vas changer ce domaine 'www....'

  constructor(private http:HttpClient) { }

  getVilles(){
      return this.http.get(this.host+"/villes");
  }
}
