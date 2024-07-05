import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-fitness-button',
  standalone: true,
  imports: [ButtonModule, CommonModule, RouterModule],
  templateUrl: './fitness-button.component.html',
  styleUrl: './fitness-button.component.scss',
})
export class FitnessButtonComponent implements OnInit {
  //? ROUTER ACTIVE LINK cosa fa?

  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' | 'top' | 'bottom' = 'left';
  @Input() loading: boolean = false;
  @Input() rounded: boolean = false;
  @Input() outline: boolean = false;
  @Input() raised: boolean = false;
  @Input() badgeNumber: string = '';
  @Input() type: string = 'submit';
  @Input() target: string = '';
  @Input() readOnly: boolean = false;
  @Input() link: boolean = false;
  @Input() urlLink: string = '';
  @Input() color: 'PRIMARY' | 'SECONDARY' | 'ACCENT' | 'EMPTY' = 'EMPTY';
  @Input() styleClasses: string[] = [];

  @Output() btnEvent = new EventEmitter();
  btnColor: string = '';
  classes: string[] = [];

  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.btnColor = this.mapColorButton();
    this.classes.push(this.btnColor, ...this.styleClasses);
  }

  onClickBtn() {
    this.btnEvent.emit();
  }

  mapColorButton(): string {
    switch (this.color) {
      case 'PRIMARY':
        return 'blue';
      case 'SECONDARY':
        return 'gray';
      case 'ACCENT':
        return 'green';
      default:
        return 'empty';
    }
  }
}
