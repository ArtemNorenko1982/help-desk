import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ui-tickets-shell',
  imports: [RouterOutlet],
  templateUrl: './tickets-shell.component.html',
  styleUrl: './tickets-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsShellComponent {}
