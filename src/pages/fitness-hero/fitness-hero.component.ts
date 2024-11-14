import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED_COMPONENTS } from '..';
import { ViewportService } from '../../services/viewport/viewport.service';
import { FitnessAuthStructureHtmlComponent } from "../../components/fitness-auth-structure-html/fitness-auth-structure-html.component";

@Component({
  selector: 'app-fitness-hero',
  standalone: true,
  imports: [...SHARED_COMPONENTS, CommonModule, FitnessAuthStructureHtmlComponent],
  templateUrl: './fitness-hero.component.html',
  styleUrl: './fitness-hero.component.scss',
})
export class FitnessHeroComponent implements OnInit {
  viewScreen: number = window.innerWidth;

  constructor(
    private viewportService: ViewportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._checkSessione();
    this.viewportService.viewScreen$.subscribe({
      next: (size) => (this.viewScreen = size),
    });
  }

  private _checkSessione() {
    const account = JSON.parse(localStorage.getItem('Account')!);
    if (account) {
      this.router.navigate(['dashboard']);
    }
  }
}
