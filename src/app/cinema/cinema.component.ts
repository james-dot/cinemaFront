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
  public selectedTickets;

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
    this.selectedTickets=[];
  },err =>{ 
    console.log(err);
  });
  }
  onSelectTicket(t){
    if(!t.selected){
      t.selected = true;
      this.selectedTickets.push(t);
    }else{
      t.selected = false;
      this.selectedTickets.splice(this.selectedTickets.indexOf(t),1);
    }
     
  }
  //css color du button
  getTicketClass(t){
      let str= "ticket btn ";
      if(t.reserve==true){
        str+="btn-danger";
      }else if(t.selected){
        str+="btn-warning";
      }else{
        str+="btn-success";
      }
      return str;
  }
  //payer les tickets
  onPayTickets(dataForm){
    let tickets=[];
    this.selectedTickets.forEach(t => {
      tickets.push(t.id);
    });
    dataForm.tickets=tickets;
    this.cinemaService.payerTickets(dataForm).subscribe(data =>{
      alert("Tickets Réservés avec succès !");
      this.onGetTicketsPlaces(this.currentProjection);//recharger les tickets des projections(payer et non payer) 
  },err =>{
      console.log(err);
  });
  }
}
