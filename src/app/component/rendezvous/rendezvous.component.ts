import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { RendezvousService } from '../../pages/service/rendezvous.service';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';

@Component({
  selector: 'app-rendezvous',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    FluidModule,
  ],
  templateUrl: './rendezvous.component.html',
  styleUrl: './rendezvous.component.scss',
  providers: [RendezvousService, ConfirmationService, MessageService],
  standalone: true,
})
export class RendezvousComponent implements OnInit{
  constructor() { } // Constructor for RendezvousComponent

  ngOnInit() { // Lifecycle hook that is called after data-bound properties are initialized
    // Initialization logic can go here
  } // End of ngOnInit method
}
