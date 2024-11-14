import { Component } from '@angular/core';

@Component({
  selector: 'app-fitness-footer',
  standalone: true,
  imports: [],
  templateUrl: './fitness-footer.component.html',
  styleUrl: './fitness-footer.component.scss',
})
export class FitnessFooterComponent {
  public year: number = new Date().getFullYear();
}
