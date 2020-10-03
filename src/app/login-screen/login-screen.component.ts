import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticateService} from "../authenticate.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  error = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
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
    this.authService.login(data).subscribe(
      (response: any) => {
        this.router.navigate([this.returnUrl]);
      }
    );
  }

}
