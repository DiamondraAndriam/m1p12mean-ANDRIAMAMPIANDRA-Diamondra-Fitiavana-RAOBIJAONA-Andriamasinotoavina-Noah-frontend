import { Routes } from "@angular/router";
import { UserManagement } from "./user-management.component.ts";
import { AuthGuard } from "../../guards/auth.guard.js";

export default [
    { path: 'user-management', component: UserManagement, canActivate: [AuthGuard], data: { expectedRole: 'manager' }},
] as Routes;
