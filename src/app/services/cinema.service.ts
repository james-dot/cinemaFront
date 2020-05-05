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
  getCinemas(ville){
    return this.http.get(ville._links.cinemas.href);
  }
  getSalles(cinema){
    return this.http.get(cinema._links.salles.href);
  }
  getProjections(salle){
    let url=salle._links.projections.href.replace("{?projection}","");
    return this.http.get(url+"?projection=p1");//la notion de projection dans restData spring
  }
}
