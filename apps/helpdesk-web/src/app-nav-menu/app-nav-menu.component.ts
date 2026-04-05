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
import { HasPermissionDirective, ButtonComponent } from '@shared-ui';

@Component({
  selector: 'app-nav-menu',
  imports: [
    NgTemplateOutlet,
    RouterLink,
    HasPermissionDirective,
    ButtonComponent,
  ],
  templateUrl: './app-nav-menu.component.html',
  styleUrls: ['./app-nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavMenuComponent {
  @Input({ required: true }) navItems: NavItem[] = [];
  @Input() showMenu = false;

  // close menu on mobile after click
  @Output() itemClicked = new EventEmitter<NavItem>();
  @Output() closeMenu = new EventEmitter<boolean>();

  onItemClicked(item: NavItem): void {
    this.itemClicked.emit(item);
    this.onMenuClose(); // Close the menu after an item is clicked
  }

  onMenuClose(): void {
    this.closeMenu.emit(!this.showMenu);
  }
}
