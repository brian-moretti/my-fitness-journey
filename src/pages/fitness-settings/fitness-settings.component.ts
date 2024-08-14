import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SHARED_COMPONENTS } from '..';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IUser } from '../../core/model/interface/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-fitness-settings',
  standalone: true,
  imports: [...SHARED_COMPONENTS, CommonModule, ...PRIMENG_COMPONENTS],
  templateUrl: './fitness-settings.component.html',
  providers: [ConfirmationService, MessageService],
  styleUrl: './fitness-settings.component.scss',
})
export class FitnessSettingsComponent implements OnInit {
  account: IUser = {};
  backupUser: IUser = {};
  userLogged: IUser = {};
  isEditable: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._getAccount();
    this._getUsers();
  }

  private _getAccount() {
    this.account = JSON.parse(localStorage.getItem('Account')!);
  }

  private _getUsers() {
    this.userService.getAllUser().subscribe({
      next: (users) => {
        this.userLogged =
          users.find((user) => user.id === this.account.id) || {};
        this.backupUser = cloneDeep(this.userLogged);
      },
      error: () => {},
    });
  }

  editAccount() {
    this.isEditable = true;
  }

  cancelEdit() {
    this.userLogged = this.backupUser;
    this.isEditable = false;
  }

  saveEdit() {
    this.userService.modifyUserUsingPut(this.userLogged).subscribe({
      next: (updatedUser) => {
        this.userLogged = updatedUser;
        this.backupUser = this.userLogged;
        localStorage.setItem('Account', JSON.stringify(updatedUser));
      },
    });
    this.isEditable = false;
  }

  private _deleteAccount() {
    this.userService.deleteUserUsingDelete(this.userLogged).subscribe({
      next: () => {
        localStorage.removeItem('Account');
        this.router.navigate(['']);
      },
      error: () => {},
    });
  }

  alertDialogue(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you really want to delete your account?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      defaultFocus: 'none',
      accept: () => {
        this.messageService.add({
          key: 'success',
          severity: 'success',
          summary: 'Account Deleted',
          detail: 'Your account has been deleted',
          life: 2000,
        });
        this.isEditable = false;
      },
      reject: () => {
        this.messageService.add({
          key: 'reject',
          severity: 'info',
          summary: 'Stay Hard',
          detail: 'Keep grinding! Your account is still here',
          life: 2000,
        });
        this.isEditable = false;
      },
    });
  }

  onCloseToast() {
    this._deleteAccount();
  }
}
