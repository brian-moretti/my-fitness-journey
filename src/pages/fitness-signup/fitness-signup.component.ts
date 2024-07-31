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
import { IUserCreated } from '../../core/model/interface/user';
import { UserService } from '../../services/user/user.service';

@Component({
  standalone: true,
  imports: [...SHARED_COMPONENTS, ...PRIMENG_COMPONENTS, ReactiveFormsModule],
  templateUrl: './fitness-signup.component.html',
  styleUrl: './fitness-signup.component.scss',
})
export class FitnessSignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private router: Router, private user: UserService) {}

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
      next: (user: IUserCreated) => {
        this.router.navigate(['auth/login']);
        form.reset();
        //* ADD MESSAGE OF CREATION DONE with user info
      },
      error: () => {},
    });
  }
}
