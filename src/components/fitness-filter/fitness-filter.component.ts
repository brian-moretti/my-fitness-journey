import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PRIMENG_COMPONENTS } from '../../core/library/primeng-index';
import { bodyParts, IBodyParts } from '../../utilities/bodyParts';
import { ITargets, targets } from '../../utilities/targets';
import { IFilters } from '../../core/model/interface/filterExercises';

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

  searchName: string = '';
  targets: ITargets[] = [];
  selectedTarget!: ITargets;
  bodyParts: IBodyParts[] = [];
  selectedBodyPart!: IBodyParts;
  checkEntireDatabase: boolean = false;
  filters: IFilters = {};

  ngOnInit(): void {
    this.targets = targets;
    this.bodyParts = bodyParts;
  }

  onSearchName(searchName: string) {
    this.filters.searchName = searchName;
    this.onFilters();
  }
  onSelectTargets(targets: ITargets | null) {
    this.filters.selectedTarget = targets?.target;
    this.onFilters();
  }
  onSelectBodyPart(bodyPart: IBodyParts | null) {
    this.filters.selectedBodyPart = bodyPart?.bodyPart;
    this.onFilters();
  }
  onCheckEntireDatabase(checkEntireDatabase: boolean) {
    this.filters.checkEntireDatabase = checkEntireDatabase;
    this.onFilters();
  }
  onFilters() {
    this.filtersToApply.emit(this.filters);
  }
}
