import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { IFilters } from '../../core/model/interface/filterExercises';
import { bodyParts, IBodyParts } from '../../utilities/bodyParts';
import { ITargets, targets } from '../../utilities/targets';

@Component({
  selector: 'app-fitness-filter',
  standalone: true,
  imports: [PRIMENG_COMPONENTS],
  templateUrl: './fitness-filter.component.html',
  styleUrl: './fitness-filter.component.scss',
})
export class FitnessFilterComponent implements OnInit {
  @Output() filtersToApply: EventEmitter<IFilters> =
    new EventEmitter<IFilters>();

  public searchName: string = '';
  public targets: ITargets[] = [];
  public selectedTarget!: ITargets;
  public bodyParts: IBodyParts[] = [];
  public selectedBodyPart!: IBodyParts;
  public filters: IFilters = {};

  ngOnInit(): void {
    this.targets = targets;
    this.bodyParts = bodyParts;
  }

  public onSearchName(searchName: string) {
    this.filters.name = searchName;
    this._onFilters();
  }
  public onSelectTargets(targets: ITargets | null) {
    this.filters.target = targets?.target;
    this._onFilters();
  }
  public onSelectBodyPart(bodyPart: IBodyParts | null) {
    this.filters.bodyPart = bodyPart?.bodyPart;
    this._onFilters();
  }
  private _onFilters() {
    this.filtersToApply.emit(this.filters);
  }
}
