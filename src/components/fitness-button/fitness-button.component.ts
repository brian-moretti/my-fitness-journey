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

  @Input()
  severity:
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'help'
    | 'primary'
    | 'secondary'
    | 'contrast'
    | null
    | undefined = null;
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' | 'top' | 'bottom' = 'left';
  @Input() loading: boolean = false;
  @Input() rounded: boolean = false;
  @Input() outline: boolean = false;
  @Input() raised: boolean = false;
  @Input() text: boolean = false;
  @Input() size: 'small' | 'large' | undefined = undefined;
  @Input() badgeNumber: string = '';
  @Input() type: string = '';
  @Input() target: string = '';
  @Input() disabled: boolean = false;
  @Input() link: boolean = false;
  @Input() urlLink!: string | any[];
  @Input() color: 'PRIMARY' | 'SECONDARY' | 'ACCENT' | 'ONLYCOLOR' | 'EMPTY' =
    'EMPTY';
  @Input() styleClasses: string[] = [];

  @Output() btnEvent = new EventEmitter();

  btnColor: string = '';
  classes: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.btnColor = this._mapColorButton();
    this.classes.push(this.btnColor, ...this.styleClasses);
  }

  public onClickBtn(event?: any) {
    this.btnEvent.emit(event);
  }

  private _mapColorButton(): string {
    switch (this.color) {
      case 'PRIMARY':
        return 'primary';
      case 'SECONDARY':
        return 'secondary';
      case 'ONLYCOLOR':
        return 'onlycolor';
      case 'ACCENT':
        return 'accent';
      default:
        return 'empty';
    }
  }
}
