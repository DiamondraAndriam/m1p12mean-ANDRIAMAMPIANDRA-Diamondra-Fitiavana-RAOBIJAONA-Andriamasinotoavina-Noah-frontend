import { Routes } from "@angular/router";
import { AuthGuard } from "../../guards/auth.guard.js";
import { ReparationComponent } from "./inserer-reparation.component.js";

export default [
    { path: 'confirm-rdv', component: ReparationComponent, canActivate: [AuthGuard], data: { expectedRole: 'client' }},
] as Routes;