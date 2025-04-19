import { Routes } from "@angular/router";
import { UserManagement } from "./user-management.component.ts";
import { AuthGuard } from "../../guards/auth.guard.js";
import { FinanceDashboardComponent } from "./finance-dashboard.component.js";
import { ServiceComponent } from "./service/service.component.js";

export default [
    { path: 'user-management', component: UserManagement, canActivate: [AuthGuard], data: { expectedRole: 'manager' }},
    { path: 'finance', component: FinanceDashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'manager' }},
    { path: 'service', component: ServiceComponent}
] as Routes;
