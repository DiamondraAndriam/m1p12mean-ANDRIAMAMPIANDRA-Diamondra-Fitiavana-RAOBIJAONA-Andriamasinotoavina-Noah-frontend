import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { NgIf, CommonModule } from '@angular/common';

import { RendezvousService } from '../../pages/service/rendezvous.service';
import { ServiceService } from '../../pages/service/service.service';

import { StepsModule } from 'primeng/steps';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous-form.component.html',
  styleUrl: './rendezvous.component.scss',
  imports: [
    CommonModule, 
    NgIf,
    StepsModule,
    DatePickerModule,
    MultiSelectModule,
    ButtonModule,
    ReactiveFormsModule,
    FluidModule,
    SelectModule,
    InputTextModule
  ],
})

export class RendezvousFormComponent implements OnInit {
  dropdownItems = [
    { name: 'Option 1', code: '1' },
    { name: 'Option 2', code: '2' },
    { name: 'Option 3', code: '3' }
  ];
  
  minDate: Date = new Date();

  dropdownItem = null;

  rendezvous: any;
  steps: any[] = [];
  activeIndex: number = 0;
  appointmentForm: FormGroup;
  
  services: any[] = [];
  unavailableDates: any[] = [];
  availableTimes: any[] = [];
  workStartTime!: string;
  workEndTime!: string;
  
  mecanos: SelectItem[] = [];
  
  selectedService: any;
  selectedMecano: any;

  constructor(private fb: FormBuilder, private serviceService: ServiceService, private rendezvousService: RendezvousService) {
    this.appointmentForm = this.fb.group({
      service: [null, Validators.required],
      month: [null, Validators.required],
      appointmentDate: [null, Validators.required],
      mecano: [null, Validators.required],
      appointmentTime : [null, Validators.required]
    });
  }

  ngOnInit() {
    this.steps = [
      { label: 'Service et mois' },
      { label: 'Date et heure' },
      { label: 'Mécanicien' }
    ];
    this.loadServices();
  }

  loadServices() {
    this.serviceService.getServices().subscribe({
      next: (data) => {
        this.services = data.map(service => ({
          name: service.nom,
          code: service.id,
        }));
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des services', error);
      }
    });
  }

  onServiceChange() {
    this.loadService(this.appointmentForm.value.service);
    this.loadUnavailableDates();
  }

  onMonthChange() {
    this.loadUnavailableDates();
  }

  onDateSelect() {
    this.loadAvailableTimes();
  }

  onTimeSelect() {
    const selectedTime = this.appointmentForm.value.appointmentTime;
    const selectedDate = this.appointmentForm.value.appointmentDate;
    const startTime = new Date(`${selectedDate}T${selectedTime}`);
    const endTime = new Date(startTime.getTime() + this.selectedService.duration * 60000); // Ajouter la durée
    this.availableTimes = this.generateAvailableTimes(startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), this.selectedService.duration);
    this.loadMecanos();
  }

  loadService(serviceId: string) {
    const month = this.appointmentForm.value.month;
    this.loadUnavailableDates();
    this.serviceService.getServiceById(serviceId).subscribe((data) => {
      this.selectedService = data;
    });
    this.serviceService.getWorksHours().subscribe((data) => {
      this.workStartTime = data[0].startTime;
      this.workEndTime = data[0].endTime;
    });
  }

  loadUnavailableDates() {
    this.serviceService.getUnavailableDates(this.appointmentForm.value.service, this.appointmentForm.value.month, new Date().getFullYear()).subscribe(
    (data) => {
        // Formater les dates et heures d'indisponibilité
        this.unavailableDates = data.map(item => {
          const unavailableDate = new Date(item.date);  // "date" : format YYYY-MM-DD
          const startTime = item.startTime.split(':+');
          const endTime = item.endTime.split(':');
          
          return {
            date: unavailableDate,
            startTime: new Date(unavailableDate.setHours(Number(startTime[0]), Number(startTime[1]))),
            endTime: new Date(unavailableDate.setHours(Number(endTime[0]), Number(endTime[1])))
          };
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des dates indisponibles', error);
      }
    );
    this.unavailableDates = [
      new Date('2025-04-10'), new Date('2025-04-11')
    ];
  }

  generateAvailableTimes(startTime: string, endTime: string, duration: number): string[] {
    let currentTime = new Date(`2025-01-01T${startTime}:00`);
    const endTimeDate = new Date(`2025-01-01T${endTime}:00`);
    // Générer des créneaux horaires disponibles
    
    let times: any[] = [];
    times =[{
      startTime: {label: startTime, value: startTime},
      endTime: {label: endTime, value: endTime}
    }]
    return times;
  }

  loadMecanos() {
    this.loadService(this.appointmentForm.value.service);
    this.serviceService.getMecaniciensDisponibles(
      this.appointmentForm.value.service, 
      this.appointmentForm.value.appointmentDate).subscribe((data) => {
      this.mecanos = data.map((mecano: any) => ({ label: mecano.name, value: mecano.id }));
    });
  }

  onTimeSlotChange() {
    const selectedTimeSlot = this.appointmentForm.value.appointmentTime;
    const startTime = selectedTimeSlot.startTime;
    const endTime = selectedTimeSlot.endTime;
    
    this.appointmentForm.patchValue({
      appointmentTime: { startTime, endTime }
    });
  }

  loadAvailableTimes() {
    const selectedDate = this.appointmentForm.value.appointmentDate;
    const selectedService = this.appointmentForm.value.service;
    
    const defaultCreneau = { debut : this.workStartTime, fin : this.workEndTime };

    this.serviceService.getCreneaux(selectedService, selectedDate).subscribe((data) => {
      this.availableTimes = data.map((creneau: any) => ({
        startTime: creneau.debut,
        endTime: creneau.fin
      }));
    });
  }

  submitForm() {
    if (this.appointmentForm.valid) {
      console.log('Formulaire soumis:', this.appointmentForm.value);
    }
  }

  
}