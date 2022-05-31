import { Injectable } from '@angular/core';
import { PeopleInterface } from '../models/people';

@Injectable({
  providedIn: 'root'
})
export class ManagerServiceService {

  
  collectionPeople: PeopleInterface[] = [];
  closeForm: boolean = false;
  idEdit: number = 0;

  constructor() { }

  get listPeople(): PeopleInterface[] {
    return this.collectionPeople;
  }

  get seeList(): boolean {

    if( this.collectionPeople.length > 0 ) {
      return true;
    }else{
      return false;
    }
  }


  addPeople( data: PeopleInterface){

    this.collectionPeople.push(data);
    console.log(data);

  }

  deletePeople( id: number){

    this.collectionPeople.splice(id,1);
  }

  filterPeople( id: number): PeopleInterface {
    return this.collectionPeople[id];
  }

  editPeople( id: number, data: PeopleInterface){
    this.collectionPeople.splice(id, 1, data);
  }

}
