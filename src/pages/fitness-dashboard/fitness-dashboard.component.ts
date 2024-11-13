import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SHARED_COMPONENTS } from '..';
import { FitnessButtonComponent } from '../../components';
import { IUser } from '../../core/model/interface/user';
import { UserService } from '../../services/user/user.service';
import { ViewportService } from '../../services/viewport/viewport.service';

@Component({
  selector: 'app-fitness-dashboard',
  standalone: true,
  imports: [...SHARED_COMPONENTS, FitnessButtonComponent, CommonModule],
  templateUrl: './fitness-dashboard.component.html',
  styleUrl: './fitness-dashboard.component.scss',
})
export class FitnessDashboardComponent implements OnInit {
  public user: IUser = {};
  public currentUser: IUser | undefined = {};
  public motivationalPhrases = [
    {
      id: 1,
      text: 'Every rep brings you closer to your goal. Keep improving, your future self will thank you!',
    },
    {
      id: 2,
      text: 'Every tracked workout is a step forward. Make your progress visible and discover how far you can go!',
    },
    {
      id: 3,
      text: 'It’s not just another day at the gym, it’s a day where you become stronger than yesterday. Keep it up!',
    },
    {
      id: 4,
      text: 'Results don’t come in a day, but every day counts. Reach your next milestone, one workout at a time!',
    },
    {
      id: 5,
      text: 'Your effort is the key. Every tracked effort brings you closer to success: stay focused and conquer your challenge!',
    },
  ];
  public currentPhraseIndex: number = 0;
  public viewScreen: number = 0;

  constructor(
    private userService: UserService,
    private viewportService: ViewportService
  ) {}

  ngOnInit(): void {
    this._getUserLogged();
    this._carouselPhrases();
    this._checkCurrentUserLogged();
    this.viewportService.viewScreen$.subscribe({
      next: (size) => (this.viewScreen = size),
    });
  }

  private _checkCurrentUserLogged() {
    this.userService.getAllUser().subscribe({
      next: (users) => {
        this.currentUser = users.find((user) => user.id === this.user.id);
      },
      error: () => {},
    });
  }

  private _getUserLogged() {
    this.user = JSON.parse(localStorage.getItem('Account')!);
  }

  private _carouselPhrases() {
    setInterval(() => {
      this.currentPhraseIndex =
        (this.currentPhraseIndex + 1) % this.motivationalPhrases.length;
    }, 5000);
  }

  get currentPhrase() {
    return this.motivationalPhrases[this.currentPhraseIndex].text;
  }
}

//! getUserAll and filter from data form login
