import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SHARED_COMPONENTS } from '..';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IUser } from '../../core/model/interface/user';
import { AuthService } from '../../services/auth/auth.service';
import { HttpErrorsService } from '../../services/http-errors/http-errors.service';
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
  public userLogged: IUser = {};
  public isEditable: boolean = false;
  public errorMessage: string = '';
  private account: IUser = {};
  private backupUser: IUser = {};

  constructor(
    private router: Router,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private interceptor: HttpErrorsService,
    private auth: AuthService
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
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.errorMessage = this.interceptor.handleUserError(err);
        this.messageService.add({
          key: 'users-error',
          severity: 'error',
          summary: 'Database error',
          detail: this.errorMessage,
          life: 2000,
        });
      },
    });
  }

  public saveEdit() {
    this.userService.modifyUserUsingPut(this.userLogged).subscribe({
      next: (updatedUser) => {
        this.userLogged = updatedUser;
        this.backupUser = this.userLogged;
        localStorage.setItem('Account', JSON.stringify(updatedUser));
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.userLogged = this.backupUser;
        this.errorMessage = this.interceptor.handleUserError(err);
        this.messageService.add({
          key: 'users-error',
          severity: 'error',
          summary: 'Update error',
          detail: this.errorMessage,
          life: 2000,
        });
      },
    });
    this.isEditable = false;
  }

  public editAccount() {
    this.isEditable = true;
  }

  public cancelEdit() {
    this.userLogged = this.backupUser;
    this.isEditable = false;
  }

  private _deleteAccount() {
    this.userService.deleteUserUsingDelete(this.userLogged).subscribe({
      next: () => {
        this.auth.isLogoutStorage();
        this.router.navigate(['']);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.messageService.add({
          key: 'users-error',
          severity: 'error',
          summary: 'Delete error',
          detail: this.errorMessage,
          life: 2000,
        });
      },
    });
  }

  public alertDialogue(event: Event) {
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

  public onCloseToast() {
    this._deleteAccount();
  }
}
