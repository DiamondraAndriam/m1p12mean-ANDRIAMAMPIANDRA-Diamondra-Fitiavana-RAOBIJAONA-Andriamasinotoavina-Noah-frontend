import { Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard.js";
import { RendezvousComponent } from "./rendezvous/rendezvous.component.js";
import { RendezvousFormComponent } from "./rendezvous/rendezvous-form.component.js";

export default [
    { path: '', component: RendezvousComponent, canActivate: [AuthGuard], data: { expectedRole: 'client' }},
    { path: 'new', component: RendezvousFormComponent, canActivate: [AuthGuard], data: { expectedRole: 'client' }},
] as Routes;