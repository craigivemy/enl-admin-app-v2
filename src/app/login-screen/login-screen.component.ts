import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticateService} from "../authenticate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticateService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  submit() {
    const data = {
      username: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
      grant_type: 'password',
      client_id: '1',
      client_secret: 'Cbgm6niSmTPhx795IMua9T2uskFcTrjIFDNR17XO',
      scope: '*'
    };
    console.log(data);
    this.authService.login(data).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.access_token);
        this.router.navigate(['/dashboard']);
      }
    );
  }

}
