import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SHARED_COMPONENTS } from '..';
@Component({
  selector: 'app-fitness-programs',
  standalone: true,
  imports: [...SHARED_COMPONENTS, CommonModule],
  templateUrl: './fitness-programs.component.html',
  styleUrl: './fitness-programs.component.scss',
})
export class FitnessProgramsComponent implements OnInit {
  programs = [];
  ngOnInit(): void {}
}
