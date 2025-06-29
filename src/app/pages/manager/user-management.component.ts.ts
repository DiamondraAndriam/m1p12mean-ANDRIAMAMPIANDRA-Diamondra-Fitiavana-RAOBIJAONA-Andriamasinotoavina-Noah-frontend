import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { CustomerService } from '../service/customer.service';
import { ProductService } from '../service/product.service';
import { User, UserService } from '../service/user.service';
import { DialogModule } from 'primeng/dialog';
import { Password } from 'primeng/password';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'app-table-demo',
    standalone: true,
    imports: [
        TableModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        TagModule,
        InputTextModule,
        SliderModule,
        ProgressBarModule,
        ToggleButtonModule,
        ToastModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        RatingModule,
        RippleModule,
        IconFieldModule,
        DialogModule,
        TableModule
    ],
    template: `<div class="card">
        <div class="font-semibold text-xl mb-4">Gestion des utilisateurs</div>
        <p-table
            #dt1
            [value]="users"
            dataKey="_id"
            [rows]="10"
            [loading]="loading"
            [rowHover]="true"
            [showGridlines]="true"
            [paginator]="true"
            [globalFilterFields]="['firstName', 'lastName', 'email', 'phone']"
            responsiveLayout="scroll"
        >
            <ng-template #caption>
                <div class="flex justify-between items-center">
                    <p-iconfield iconPosition="left">
                        <p-inputicon>
                            <i class="pi pi-search"></i>
                        </p-inputicon>
                        <input pInputText type="text" (input)="onGlobalFilter(dt1, $event)" placeholder="Rechercher..." />
                    </p-iconfield>
                </div>
            </ng-template>
            
            <ng-template #header>
                <tr>
                    <th>Matricule</th>
                    <th>Role</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Adresse</th>
                    <th>Statut</th>
                    <th>Actions</th>
                </tr>
            </ng-template>

            <ng-template #body let-user>
                <tr>
                    <td>{{ user.matricule }}</td>
                    <td>{{ user.role }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.address }}</td>
                    <td>
                        <p-tag [value]="user.active ? 'Actif' : 'Inactif'" [severity]="user.active ? 'success' : 'danger'"></p-tag>
                    </td>
                    <td class="flex gap-5">
                        <button pButton icon="pi pi-ban" class="p-button-warning p-mr-2" (click)="toggleUserStatus(user)" [label]="user.active ? 'Désactiver' : 'Activer'"></button>
                        <button pButton icon="pi pi-trash" class="p-button-danger" (click)="openConfirmation(user)"></button>
                        <button pButton icon="pi pi-pencil" class="p-button-info" (click)="editUser(user)"></button>

                        
                         <!-- ✅ Boîte de dialogue de modification -->
                        <p-dialog header="Modifier l'utilisateur" [(visible)]="displayEditDialog" [style]="{ width: '500px' }" [modal]="true">
                            <div>
                                <div class="flex gap-2 items-center mb-3">
                                    <label for="address">Matricule</label>
                                    <input id="matricule" type="text" pInputText [(ngModel)]="editForm.matricule" />
                                </div>
                                <div class="flex gap-2 items-center mb-3">
                                    <label for="lastName">Nom</label>
                                    <input id="lastName" type="text" pInputText [(ngModel)]="editForm.lastName" />
                                </div>
                                <div class="flex gap-2 items-center mb-3">
                                    <label for="firstName">Prénom</label>
                                    <input id="firstName" type="text" pInputText [(ngModel)]="editForm.firstName" />
                                </div>
                                <div class="flex gap-2 items-center mb-3">
                                    <label for="email">Email</label>
                                    <input id="email" type="email" pInputText [(ngModel)]="editForm.email" />
                                </div>
                                <div class="flex gap-2 items-center mb-3">
                                    <label for="phone">Téléphone</label>
                                    <input id="phone" type="text" pInputText [(ngModel)]="editForm.phone" />
                                </div>
                                <div class="flex gap-2 items-center mb-3">
                                    <label for="address">Adresse</label>
                                    <input id="address" type="text" pInputText [(ngModel)]="editForm.address" />
                                </div>
                                <div class="flex gap-2 items-center mb-3">
                                    <label for="password">Mot de passe</label>
                                    <input id="password" type="password" pInputText [(ngModel)]="editForm.password" />
                                </div>
                            </div>
                            <ng-template #footer>
                                <p-button label="Annuler" icon="pi pi-times" (click)="closeEditDialog()" text severity="secondary" />
                                <p-button label="Enregistrer" icon="pi pi-check" (click)="saveEditUser()" severity="success" />
                            </ng-template>
                        </p-dialog>

                        <p-dialog header="Confirmation" [(visible)]="displayConfirmation" [style]="{ width: '350px' }" [modal]="true">
                            <div class="flex items-center justify-center">
                                <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem"> </i>
                                <span>Êtes-vous sûr de vouloir continuer ?</span>
                            </div>
                            <ng-template #footer>
                                <p-button label="Non" icon="pi pi-times" (click)="closeConfirmation()" text severity="secondary" />
                                <p-button label="Oui" icon="pi pi-check" (click)="deleteUser()" severity="danger" outlined autofocus />
                            </ng-template>
                        </p-dialog>
                    </td>
                </tr>
            </ng-template>

            <ng-template #emptymessage>
                <tr>
                    <td colspan="8">Aucun utilisateur trouvé.</td>
                </tr>
            </ng-template>

            <ng-template #loadingbody>
                <tr>
                    <td colspan="8">Chargement des utilisateurs...</td>
                </tr>
            </ng-template>
        </p-table>
    </div>
    `,
    styles: `
        .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        .p-datatable-scrollable .p-frozen-column {
            font-weight: bold;
        }
    `,
    providers: [ConfirmationService, MessageService, CustomerService, ProductService]
})
export class UserManagement implements OnInit {
    users: any[] = [];
    loading: boolean = true;
    displayConfirmation: boolean = false;
    selectedUser: any;
    editForm: any = {
        _id: '',
        matricule: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: ''
    };
    displayEditDialog = false;

    constructor(
      private userService: UserService,
      private messageService: MessageService
    ) {}
  
    ngOnInit() {
      this.loadUsers();
    }
  
    loadUsers() {
      this.userService.getUsers().subscribe((data) => {
        this.users = data;
        this.loading = false;
      });
    }
  
    onGlobalFilter(table: any, event: any) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
  
    toggleUserStatus(user: any) {
        user.active = !user.active;
        this.userService.disableUser(user._id).subscribe((response) => {
            console.log('Résultat de la mise à jour du statut :', response); // Ajout du console.log
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Statut mis à jour' });
        });
    }    
  
    deleteUser() {
      this.userService.deleteUser(this.selectedUser._id).subscribe(() => {
        this.users = this.users.filter(user => user._id !== this.selectedUser._id);
        this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: 'Utilisateur supprimé avec succès' });
      });

      this.closeConfirmation();
    }

    openConfirmation(user: any) {
        this.selectedUser = user;
        this.displayConfirmation = true;
    }

    closeConfirmation() {
        this.displayConfirmation = false;
    }

    editUser(user: any) {
        this.editForm = { ...user };
        this.displayEditDialog = true;
    }

    closeEditDialog() {
        this.displayEditDialog = false;
    }

    saveEditUser() {
        this.userService.updateUser(this.editForm._id, this.editForm).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Modifié', detail: 'Utilisateur mis à jour' });
            this.loadUsers();
            this.closeEditDialog();
        });
    }
}
