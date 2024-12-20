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
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IUser } from '../../core/model/interface/user';
import { HttpErrorsService } from '../../services/http-errors/http-errors.service';
import { UserService } from '../../services/user/user.service';
import { FitnessAuthStructureHtmlComponent } from "../../components/fitness-auth-structure-html/fitness-auth-structure-html.component";

@Component({
  standalone: true,
  imports: [
    ...SHARED_COMPONENTS,
    ...PRIMENG_COMPONENTS,
    ReactiveFormsModule,
    CommonModule,
    FitnessAuthStructureHtmlComponent
],
  providers: [MessageService],
  templateUrl: './fitness-signup.component.html',
  styleUrl: './fitness-signup.component.scss',
})
export class FitnessSignupComponent implements OnInit {
  public signupForm!: FormGroup;
  public errorMessage: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private toast: MessageService,
    private interceptor: HttpErrorsService
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl<string>('', Validators.required),
    });
  }

  get usernameControl() {
    return this.signupForm.get('username') as FormControl;
  }
  get emailControl() {
    return this.signupForm.get('email') as FormControl;
  }
  get passwordControl() {
    return this.signupForm.get('password') as FormControl;
  }

  public onSignupSubmit(form: FormGroup) {
    const signupForm = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
    };

    this.userService.createUserUsingPost(signupForm).subscribe({
      next: (user: IUser) => {
        this.toast.add({
          severity: 'success',
          summary: `${user.username}'s Account Created`,
          detail: 'Login to your account',
          life: 2000,
          key: 'success',
        });
        setTimeout(() => {
          form.reset();
          this.router.navigate(['auth/login']);
        }, 2000);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this.errorMessage = this.interceptor.handleSignupError(error);
        this.toast.add({
          severity: 'error',
          summary: 'Signup Error',
          detail: this.errorMessage,
          key: 'error',
          life: 2000,
        });
      },
    });
  }
}
