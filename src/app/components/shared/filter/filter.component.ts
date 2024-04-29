import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() findOption !: string;
  @Input() sortOption !: string;
  @Input() sortOrder !: string;
  @Output() formClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();
  @Output() selectedSortOption: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedSortOrder: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  closeForm() {
    this.sortOption = 'none';
    this.sortOrder = 'asc';
    this.findOption = 'sendProducts';
    this.formClosed.emit();
  }

  submitForm() {
    console.log("find option: " + this.findOption);
    console.log("sortOption: " + this.sortOption);
    console.log("sortOrder: " + this.sortOrder);
    console.log("selected sort option: " + this.selectedSortOption);
    console.log("selected sort order: " + this.selectedSortOrder);
    this.selectedSortOption.emit(this.sortOption);
    this.selectedSortOrder.emit(this.sortOrder);
    this.formSubmitted.emit();
  }
}
