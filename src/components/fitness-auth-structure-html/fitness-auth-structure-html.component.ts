import { Component, Input } from '@angular/core';
import { SHARED_COMPONENTS } from '../../pages';

@Component({
  selector: 'app-fitness-auth-structure-html',
  standalone: true,
  imports: [SHARED_COMPONENTS],
  templateUrl: './fitness-auth-structure-html.component.html',
  styleUrl: './fitness-auth-structure-html.component.scss',
})
export class FitnessAuthStructureHtmlComponent {
  @Input() stylePersonalized: boolean = false;
}
