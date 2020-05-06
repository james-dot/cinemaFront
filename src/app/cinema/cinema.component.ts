import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../services/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  
  public villes;
  public cinemas;
  public salles;
  public currentVille;
  public currentCinema;
  public currentProjection;

  constructor(public cinemaService:CinemaService) { }

  ngOnInit(): void {
      this.cinemaService.getVilles().subscribe(data =>{
          this.villes=data;
      },err =>{
          console.log(err);
      });
  }
  onGetCinemas(ville){
    this.currentVille=ville;
    this.salles=undefined;//quant en click sur une autre ville l'espace salle videe.. 
    this.cinemaService.getCinemas(ville).subscribe(data =>{
      this.cinemas=data;
  },err =>{
      console.log(err);
  });
  }

  onGetSalles(cinema){//cette methode retourne la salle et la projection dans une salle
    this.currentCinema=cinema;
    this.cinemaService.getSalles(cinema).subscribe(data =>{
      this.salles=data;
      this.salles._embedded.salles.forEach(salle => {
            this.cinemaService.getProjections(salle).subscribe(data =>{
              salle.projections=data;
          },err =>{
              console.log(err);
          });
      });
  },err =>{
      console.log(err);
  });
  }
  onGetTicketsPlaces(p){
    this.currentProjection=p;
   this.cinemaService.getTicketsPlace(p).subscribe(data =>{
    this.currentProjection.tickets=data;
  },err =>{ 
    console.log(err);
  });
  }
 
}
