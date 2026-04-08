import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ui-users-shell.component',
  imports: [RouterOutlet],
  templateUrl: './users-shell.component.html',
  styleUrl: './users-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersShellComponent {}
