import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SHARED_COMPONENTS } from '..';
import { FitnessAuthStructureHtmlComponent } from '../../components/fitness-auth-structure-html/fitness-auth-structure-html.component';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IUser } from '../../core/model/interface/user';
import { AuthService } from '../../services/auth/auth.service';
import { HttpErrorsService } from '../../services/http-errors/http-errors.service';
import { LoginService } from '../../services/login/login.service';

@Component({
  standalone: true,
  imports: [
    ...SHARED_COMPONENTS,
    ...PRIMENG_COMPONENTS,
    ReactiveFormsModule,
    CommonModule,
    FitnessAuthStructureHtmlComponent,
  ],
  providers: [MessageService],
  templateUrl: './fitness-login.component.html',
  styleUrl: './fitness-login.component.scss',
})
export class FitnessLoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private toast: MessageService,
    private router: Router,
    private loginService: LoginService,
    private guard: AuthService,
    private interceptor: HttpErrorsService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl<string>('', Validators.required),
    });
  }

  get usernameControl() {
    return this.loginForm.get('username') as FormControl;
  }
  get emailControl() {
    return this.loginForm.get('email') as FormControl;
  }
  get passwordControl() {
    return this.loginForm.get('password') as FormControl;
  }

  onLoginSubmit(form: FormGroup) {
    const loginForm = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
    };
    this.loginService.loginUserUsingPost(loginForm).subscribe({
      next: (users: IUser[]) => {
        const account = users.find(
          (user) =>
            user.username === loginForm.username &&
            user.email === loginForm.email
        );
        //! METODO GETUSER CON ID ACCOUNT.ID
        //! VERIFICARE IL REDIRECT DI LOGIN TO /USERS

        if (account && account.id) {
          this.guard.isLoginStorage(account);
          this.router.navigate(['dashboard']);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this.errorMessage = this.interceptor.handleLoginError(error);
        this.toast.add({
          severity: 'error',
          summary: 'Login error',
          detail: this.errorMessage,
          life: 1500,
        });
      },
    });
  }
}
