import { Routes } from "@angular/router";
import { AuthGuard } from "../../guards/auth.guard.js";
import { ReparationsComponent } from "./reparations.component.js";

export default [
    { path: 'list-reparation', component: ReparationsComponent, canActivate: [AuthGuard], data: { expectedRole: 'mecanicien' }},
] as Routes;