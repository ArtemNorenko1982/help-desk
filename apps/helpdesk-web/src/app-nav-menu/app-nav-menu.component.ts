import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NavItem } from './nav-item';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  imports: [NgClass, RouterLink],
  templateUrl: './app-nav-menu.component.html',
  styleUrl: './app-nav-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavMenuComponent {
  @Input({ required: true }) navItem: NavItem[] = [];
  @Input() isSidebarCollapsed = false;

  // close menu on mobile after click
  @Output() itemClicked = new EventEmitter<NavItem>();
}
