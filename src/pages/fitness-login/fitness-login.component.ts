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
  templateUrl: './fitness-login.component.html',
  styleUrl: './fitness-login.component.scss',
})
export class FitnessLoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private router: Router) {}

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

  onLoginSubmit(form: FormGroup) {
    const loginForm = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
    };
    this.router.navigate(['dashboard']);
  }
}
