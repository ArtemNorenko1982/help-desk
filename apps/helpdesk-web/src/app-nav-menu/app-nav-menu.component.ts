import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NavItem } from './nav-item';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HasPermissionDirective } from '@shared-ui';

@Component({
  selector: 'app-nav-menu',
  imports: [NgTemplateOutlet, RouterLink, HasPermissionDirective],
  templateUrl: './app-nav-menu.component.html',
  styleUrls: ['./app-nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavMenuComponent {
  @Input({ required: true }) navItems: NavItem[] = [];

  // close menu on mobile after click
  @Output() itemClicked = new EventEmitter<NavItem>();
}
