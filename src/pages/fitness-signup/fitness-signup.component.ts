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
import { UserService } from '../../services/user/user.service';

@Component({
  standalone: true,
  imports: [...SHARED_COMPONENTS, ...PRIMENG_COMPONENTS, ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './fitness-signup.component.html',
  styleUrl: './fitness-signup.component.scss',
})
export class FitnessSignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private router: Router,
    private user: UserService,
    private messageService: MessageService
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

  onSignupSubmit(form: FormGroup) {
    const signupForm = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
    };

    this.user.createUserUsingPost(signupForm).subscribe({
      next: (user: IUser) => {
        this.messageService.add({
          severity: 'success',
          summary: `${user.username}'s Account Created`,
          detail: 'Login to your account',
          life: 1000,
        });
        form.reset();
      },
      error: () => {},
    });
  }

  onCloseToast() {
    this.router.navigate(['auth/login']);
  }
}
