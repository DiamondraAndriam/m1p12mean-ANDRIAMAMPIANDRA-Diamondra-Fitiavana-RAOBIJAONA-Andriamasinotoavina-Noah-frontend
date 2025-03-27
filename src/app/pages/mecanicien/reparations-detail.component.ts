import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-reparations-detail',
  templateUrl: './reparations-detail.component.html',
  imports: [CommonModule, DataViewModule, FormsModule, SelectButtonModule, PickListModule, OrderListModule, TagModule, ButtonModule],
})
export class ReparationsDetailComponent {
  reparation: any;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.reparation = config.data.reparation;
  }
}