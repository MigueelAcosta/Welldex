import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginModel } from '../../models/user-login.model';
import { HttpService } from '../../service/http-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuild: FormBuilder,
    private http:HttpService,
    private router: Router) {

   }

  ngOnInit(): void {
    this.form = this.formBuild.group({
      user: new FormControl('',[Validators.required, Validators.minLength(4)]),
			password: new FormControl('',[Validators.required, Validators.minLength(4)]),
    })
  }

  get user () {
    return this.form.get('user')
  }

  get password() {
    return this.form.get('password')
  }

  onSend(){
    if(this.form.invalid){
      return;
    }
    let data: UserLoginModel = new UserLoginModel();
    data.user = this.form.get('user').value;
    data.password = this.form.get('password').value;
    this.http.login(data).subscribe( response =>{
      if(response.objectschemas.status == 'Ok'){
        this.router.navigate(['/dashboard']);
      }else{
        alert('No se pudo iniciar sesión')
      }
    });
  }
}
