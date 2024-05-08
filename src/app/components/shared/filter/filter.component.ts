import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() searchOption !: string;
  @Input() sortOrder !: string;
  @Output() formClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();
  @Output() selectedSortOption: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedSortOrder: EventEmitter<string> = new EventEmitter<string>();
  currentSortImagePath = '';
  filterImagePath = 'assets/filter.svg';

  constructor() { }

  ngOnInit(): void {
    this.currentSortImagePath = 'assets/sort-amount-up.svg'
  }

  toggleSort() {
    if (this.sortOrder == 'desc') {
      this.currentSortImagePath = 'assets/sort-amount-up.svg';
      this.sortOrder = 'asc';
    } else if (this.sortOrder == 'asc') {
      this.sortOrder = 'desc';
      this.currentSortImagePath = 'assets/sort-amount-down.svg';
    }
    console.log("Sort order: " + this.sortOrder)
  }

  closeForm() {
    this.searchOption = 'none';
    this.sortOrder = 'asc';
    this.formClosed.emit();
  }

  submitForm() {
    console.log("sortOption: " + this.searchOption);
    console.log("sortOrder: " + this.sortOrder);
    console.log("selected sort option: " + this.selectedSortOption);
    console.log("selected sort order: " + this.selectedSortOrder);
    this.selectedSortOption.emit(this.searchOption);
    this.selectedSortOrder.emit(this.sortOrder);
    this.formSubmitted.emit();
  }
}
