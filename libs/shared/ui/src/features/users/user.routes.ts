import { UserEditPageComponent } from "./user-edit-page/user-edit-page.component";
import { UserDetailsPageComponent } from "./user-details-page/user-details-page.component";
import { UserCreatePageComponent } from "./user-create-page/user-create-page.component";
import { UsersListPageComponent } from "./users-list-page/users-list-page.component";
import { UsersShellComponent } from "./users-shell.component";

export const userRoutes = [
    {
        path: '',
        component: UsersShellComponent,
        children: [
            {path: '', component: UsersListPageComponent},
            {path: 'create', component: UserCreatePageComponent},
            {path: ':id', component: UserDetailsPageComponent},
            {path: ':id/edit', component: UserEditPageComponent}
       ],
    }
];