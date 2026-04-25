import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../../lib/services/http.service';
import { V1_API_ROUTES } from '../../../lib/constants/v1.api.routes';
import { UserModel, CreateUserDto } from '../../../lib/models/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpService = inject(HttpService);

  getAllUsers(): Observable<UserModel[]> {
    return this.httpService.get<UserModel[]>(V1_API_ROUTES.USERS.GET_ALL);
  }

  getUserById(id: number): Observable<UserModel> {
    return this.httpService.get<UserModel>(V1_API_ROUTES.USERS.GET_BY_ID(id));
  }

  createUser(data: CreateUserDto): Observable<UserModel> {
    return this.httpService.post<UserModel>(V1_API_ROUTES.USERS.CREATE, data);
  }

  updateUser(id: number, data: UserModel): Observable<UserModel> {
    return this.httpService.put<UserModel>(V1_API_ROUTES.USERS.UPDATE(id), data);
  }

  deleteUser(id: number): Observable<void> {
    return this.httpService.delete<void>(V1_API_ROUTES.USERS.DELETE(id));
  }
}