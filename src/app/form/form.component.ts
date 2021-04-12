import { ThrowStmt } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UserLoginModel } from '../models/user-login.model';
import { UserRegisterModel } from '../models/user-register.model';
import { HttpService } from '../service/http-service';
import { DateValidator } from '../Validators/DateValidator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  paises = {
    "countries": [
      {
        "id": 144,
        "name": "Afganistán"
      },
      {
        "id": 114,
        "name": "Albania"
      },
      {
        "id": 18,
        "name": "Alemania"
      },
      {
        "id": 98,
        "name": "Algeria"
      },
      {
        "id": 145,
        "name": "Andorra"
      },
      {
        "id": 119,
        "name": "Angola"
      },
      {
        "id": 4,
        "name": "Anguilla"
      },
      {
        "id": 147,
        "name": "Antigua y Barbuda"
      },
      {
        "id": 207,
        "name": "Antillas Holandesas"
      },
      {
        "id": 91,
        "name": "Arabia Saudita"
      },
      {
        "id": 5,
        "name": "Argentina"
      },
      {
        "id": 6,
        "name": "Armenia"
      },
      {
        "id": 142,
        "name": "Aruba"
      },
      {
        "id": 1,
        "name": "Australia"
      },
      {
        "id": 2,
        "name": "Austria"
      },
      {
        "id": 3,
        "name": "Azerbaiyán"
      },
      {
        "id": 80,
        "name": "Bahamas"
      },
      {
        "id": 127,
        "name": "Bahrein"
      },
      {
        "id": 149,
        "name": "Bangladesh"
      },
      {
        "id": 128,
        "name": "Barbados"
      },
      {
        "id": 9,
        "name": "Bélgica"
      },
      {
        "id": 8,
        "name": "Belice"
      },
      {
        "id": 151,
        "name": "Benín"
      },
      {
        "id": 10,
        "name": "Bermudas"
      },
      {
        "id": 7,
        "name": "Bielorrusia"
      },
      {
        "id": 123,
        "name": "Bolivia"
      },
      {
        "id": 79,
        "name": "Bosnia y Herzegovina"
      },
      {
        "id": 100,
        "name": "Botsuana"
      },
      {
        "id": 12,
        "name": "Brasil"
      },
      {
        "id": 155,
        "name": "Brunéi"
      },
      {
        "id": 11,
        "name": "Bulgaria"
      },
      {
        "id": 156,
        "name": "Burkina Faso"
      },
      {
        "id": 157,
        "name": "Burundi"
      },
      {
        "id": 152,
        "name": "Bután"
      },
      {
        "id": 159,
        "name": "Cabo Verde"
      },
      {
        "id": 158,
        "name": "Camboya"
      },
      {
        "id": 31,
        "name": "Camerún"
      },
      {
        "id": 32,
        "name": "Canadá"
      },
      {
        "id": 130,
        "name": "Chad"
      },
      {
        "id": 81,
        "name": "Chile"
      },
      {
        "id": 35,
        "name": "China"
      },
      {
        "id": 33,
        "name": "Chipre"
      },
      {
        "id": 82,
        "name": "Colombia"
      }]
  };

  form : FormGroup;
  sended:boolean = false;
  formFile: any = null;

  constructor(private formBuild: FormBuilder,
    private http:HttpService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.form = this.formBuild.group({
      'name': new FormControl('',[Validators.required, Validators.minLength(4)]),
      'date': new FormControl('',[Validators.required,DateValidator.dateValidator]),
      'phone': new FormControl('',[Validators.required, Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)]),
      'bloodType': new FormControl('',[Validators.required]),
      'sex': new FormControl ('',[Validators.required]),
      'country': new FormControl ('',[Validators.required]),
      'city': new FormControl('',[Validators.required])
    })
  }

  get controls(){
    return this.form.controls;
  }

  resetForm(formDirective: FormGroupDirective){
    this.sended = false;
    formDirective.resetForm();
    this.form.reset();
  }

  onFilePicked(file){
    this.formFile = file[0];
    this.cdr.detectChanges();
  }

  prepareData():UserRegisterModel{
    let data = new UserRegisterModel();
    data.name = this.form.get('name').value;
    data.birthDate = this.form.get('date').value;
    data.phone = this.form.get('phone').value;
    data.bloodType = this.form.get('bloodType').value;
    data.sex = this.form.get('sex').value;
    data.country = this.form.get('country').value;
    data.city = this.form.get('city').value;
    data.file = this.formFile;

    return data;
  }

  onSend(formDirective: FormGroupDirective){
    this.sended = true;
    if(this.form.invalid){
      return;
    }

    this.http.sendData(this.prepareData()).subscribe(response =>{
      alert('Formulario enviado');
      this.sended = false;
      formDirective.resetForm();
      this.form.reset();
    })
  }


}
