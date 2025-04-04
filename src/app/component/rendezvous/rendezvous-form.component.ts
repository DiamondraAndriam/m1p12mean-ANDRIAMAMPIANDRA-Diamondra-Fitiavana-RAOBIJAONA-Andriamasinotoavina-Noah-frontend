import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { NgIf, CommonModule } from '@angular/common';

import { RendezvousService } from '../../pages/service/rendezvous.service';
import { ServiceService } from '../../pages/service/service.service';

import { StepsModule } from 'primeng/steps';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous-form.component.html',
  styleUrl: './rendezvous.component.scss',
  imports: [
    CommonModule, 
    NgIf,
    StepsModule,
    DropdownModule,
    CalendarModule,
    MultiSelectModule,
    ButtonModule,
    ReactiveFormsModule
  ],
})

export class RendezvousFormComponent implements OnInit {;
  rendezvous: any;
  steps: any[] = [];
  activeIndex: number = 0;
  appointmentForm: FormGroup;
  
  services: SelectItem[] = [];
  unavailableDates: any[] = [];
  workStartTime!: string;
  workEndTime!: string;
  
  mecanos: SelectItem[] = [];
  selectedService: any;
  selectedMecano: any;
  availableTimes: string[] = [];

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
      { label: 'Date et heure de Rendez-vous' },
      { label: 'Choix du Mécanicien' }
    ];
    this.loadServices();
  }

  loadServices() {
    // this.serviceService.getServices().subscribe(
    //   (data) => {
    //     this.services = data.map(service => ({
    //       label: service.name,
    //       value: service.id,
    //     }));
    //   },
    //   (error) => {
    //     console.error('Erreur lors de la récupération des services', error);
    //   }
    // );
    setTimeout(() => {
      this.services = [
        { label: 'Consultation Générale', value: 1 },
        { label: 'Chirurgie', value: 2 }
      ];
    }, 1000);
  }

  onServiceChange() {
    this.loadService(this.appointmentForm.value.service);
    this.loadUnavailableDates();
    this.loadMecanos();
  }

  loadService(serviceId: string) {
    const month = this.appointmentForm.value.month;
    this.loadUnavailableDates();
    // this.serviceService.getServiceById(serviceId).subscribe((data) => {
    //   this.selectedService = data;
    // });
    // this.serviceService.getWorksHours().subscribe((data) => {
    //   this.workStartTime = data[0].startTime;
    //   this.workEndTime = data[0].endTime;
    // });
    this.selectedService ={
      id: serviceId,
      name: 'Consultation Générale',
      duration: 30 // Durée en minutes
    }
  }

  loadUnavailableDates() {
    /*this.serviceService.getServiceUnavailability(this.appointmentForm.value.service, this.appointmentForm.value.month, new Date().getFullYear()).subscribe(
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
    );*/
    this.unavailableDates = [{ 
      date: new Date('2025-04-10'),
      startTime: new Date('2025-04-10T10:00:00'),
      endTime: new Date('2025-04-10T12:00:00')
    }, {
      date: new Date('2025-04-11'),
      startTime: new Date('2025-04-11T14:00:00'),
      endTime: new Date('2025-04-11T16:00:00')
    }];
  }

  generateAvailableTimes(startTime: string, endTime: string, duration: number): string[] {
    let times: string[] = [];
    let currentTime = new Date(`2025-01-01T${startTime}:00`);
    const endTimeDate = new Date(`2025-01-01T${endTime}:00`);
    // Générer des créneaux horaires disponibles
    while (currentTime < endTimeDate) {
      times.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      currentTime.setMinutes(currentTime.getMinutes() + duration);  // Ajouter la durée
    }
    return times;
  }

  loadMecanos() {
    this.loadService(this.appointmentForm.value.service);
    /*this.serviceService.getMecaniciensDisponibles(
      this.appointmentForm.value.service, 
      this.appointmentForm.value.appointmentDate,
      this.appointmentForm.value.appointmentDate).subscribe((data) => {
      this.mecanos = data.map((mecano: any) => ({ label: mecano.name, value: mecano.id }));
    });*/
    this.mecanos = [
      { label: 'Mécanicien 1', value: 1 },
      { label: 'Mécanicien 2', value: 2 }
    ];
  }

  submitForm() {
    if (this.appointmentForm.valid) {
      console.log('Formulaire soumis:', this.appointmentForm.value);
    }
  }

  onDateSelect(event: any) {
    this.loadMecanos();
    
  }

  OnTimeSelect(event: any) {
    const selectedTime = event.value;
    const selectedDate = this.appointmentForm.value.appointmentDate;
    const startTime = new Date(`${selectedDate}T${selectedTime}`);
    const endTime = new Date(startTime.getTime() + this.selectedService.duration * 60000); // Ajouter la durée
    this.availableTimes = this.generateAvailableTimes(startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), this.selectedService.duration);
  }
}