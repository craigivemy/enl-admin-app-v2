import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticateService} from "../authenticate.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CrossFieldErrorMatcher} from "../_helpers/cross-field-error-matcher";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  errorMatcher = new CrossFieldErrorMatcher();
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

  get email() {
    return this.loginForm.get('email');
  }

  submit() {
    const data = {
      username: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
      grant_type: 'password',
      client_id: '7',
      client_secret: 'hiZ1ZFdH8xF612RxuXIx0PHhraAIb2VkXHHMhkFK',
      scope: '*'
    };
    this.authService.login(data).subscribe(
      (response: any) => {
        if (response.error) {
          this.loginForm.get('password').setErrors({credentials: 'Invalid Credentialssss'});
          this.loginForm.get('email').setErrors({credentials: ''});
        } else {
          this.router.navigate([this.returnUrl]);
        }
      },
      err => console.log(err)
    );
  }

}
