import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PeopleInterface } from '../../models/people';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManagerServiceService } from '../../services/manager-service.service';


@Component({
  selector: 'app-form-people',
  templateUrl: './form-people.component.html',
  styleUrls: ['./form-people.component.css']
})
export class FormPeopleComponent implements OnInit {

  @Output() closeForm = new EventEmitter<boolean>();
  @Input() seeUpdate : boolean = false;

  people: PeopleInterface = {
    nombre:'',
    apellidos:'',
    edad: 0,
    DNI: '',
    cumple: undefined,
    color_favorito:'',
    sexo:''
  }

  public contactForm: FormGroup = this.fb.group({
    nombre:['',[Validators.required, Validators.minLength(3), Validators.pattern('^([a-zA-Z]+[\\s])*([a-zA-Z])*$')]],
    apellido:['',[Validators.required, Validators.minLength(3), Validators.pattern('^([a-zA-Z]+[\\s])*([a-zA-Z])*$')]],
    edad:[,[Validators.required, Validators.min(0), Validators.max(125)]],
    dni:['',[Validators.required, Validators.pattern('^[0-9]{8}[-]?[A-Za-z]$')]],
    cumple:['',[Validators.required]],
    color:['',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
    sexo:['',[Validators.required]]
  }); 

  constructor( private fb: FormBuilder,
               private servicePeople: ManagerServiceService) { }

  ngOnInit(): void {

    if(this.seeUpdate){

      console.log(this.servicePeople.idEdit);
      let person = this.servicePeople.filterPeople(this.servicePeople.idEdit);
      this.contactForm.setValue({nombre: person.nombre, apellido: person.apellidos, edad: person.edad, dni: person.DNI, cumple: person.cumple, color: person.color_favorito, sexo: person.sexo});

    }
    
  }

  addPeople(){

    if(this.contactForm.valid){

      const { nombre, apellido, edad, dni, cumple, color, sexo} = this.contactForm.value;
      this.people.nombre = nombre;
      this.people.apellidos = apellido;
      this.people.edad = edad;
      this.people.DNI = dni;
      this.people.cumple = cumple;
      this.people.color_favorito = color;
      this.people.sexo = sexo;

      //console.log(this.people);

      this.servicePeople.addPeople(this.people);

      this.closeForm.emit(false); 

      this.contactForm.reset();

      //console.log(this.servicePeople.listPeople);
      
    }else{

      this.contactForm.markAllAsTouched();
      return;

    }
  }

  cancel(){

    this.closeForm.emit(false); 

  }

  campoNovalido(campo: string) {
    return this.contactForm.controls[campo].errors && this.contactForm.controls[campo].touched;
  }

  updatePeople(){

    let index = this.servicePeople.idEdit;
    
    if(this.contactForm.valid){

      const { nombre, apellido, edad, dni, cumple, color, sexo} = this.contactForm.value;
      this.people.nombre = nombre;
      this.people.apellidos = apellido;
      this.people.edad = edad;
      this.people.DNI = dni;
      this.people.cumple = cumple;
      this.people.color_favorito = color;
      this.people.sexo = sexo;

      this.servicePeople.editPeople( index, this.people);

      this.closeForm.emit(false); 

      this.contactForm.reset();

    }else{

      this.contactForm.markAllAsTouched();
      return;

    }

  }

}
