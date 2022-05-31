import { Component, OnInit } from '@angular/core';

import { ManagerServiceService } from '../../services/manager-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  seeForm : boolean = false;
  update : boolean = false;

  constructor( public servicePeople: ManagerServiceService) { }

  ngOnInit(): void {
    
  }

  openForm(){

    this.seeForm = true;

  }


  onEdit( index: number){
    console.log(index);
    this.seeForm = true;
    this.update = true;
    this.servicePeople.idEdit = index;

  }

  onDelete(index: number){
    console.log(index);
    this.servicePeople.deletePeople(index);
  }

}
