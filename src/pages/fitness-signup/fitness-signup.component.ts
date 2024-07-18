import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_COMPONENTS } from '..';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';

@Component({
  standalone: true,
  imports: [...SHARED_COMPONENTS, ...PRIMENG_COMPONENTS, ReactiveFormsModule],
  templateUrl: './fitness-signup.component.html',
  styleUrl: './fitness-signup.component.scss',
})
export class FitnessSignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private router: Router) {}

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

  onSignupSubmit(form: FormGroup) {
    const signupForm = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
    };
    console.log(signupForm);
    this.router.navigate(['auth/login']);
  }
}
