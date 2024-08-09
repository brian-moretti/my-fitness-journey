import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { SHARED_COMPONENTS } from '..';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IUser } from '../../core/model/interface/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-fitness-settings',
  standalone: true,
  imports: [...SHARED_COMPONENTS, CommonModule, ...PRIMENG_COMPONENTS],
  templateUrl: './fitness-settings.component.html',
  styleUrl: './fitness-settings.component.scss',
})
export class FitnessSettingsComponent implements OnInit {
  account!: IUser;
  backupAccount!: IUser;
  isEditable: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this._getAccount();
    this.backupAccount = cloneDeep(this.account);
  }

  private _getAccount() {
    this.account = JSON.parse(localStorage.getItem('Account')!);
  }

  editAccount() {
    this.isEditable = true;
  }

  cancelEdit() {
    this.account = this.backupAccount;
    this.isEditable = false;
  }

  saveEdit() {
    this.userService.modifyUserUsingPut(this.account).subscribe({
      next: (value) => {
        console.log(value);
      },
    });
    this.backupAccount = this.account;
    this.isEditable = false;
  }

  deleteAccount() {
    //? DELETE CALL
    this.router.navigate(['']);
  }
}
