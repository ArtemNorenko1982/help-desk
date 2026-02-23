import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { AsideMode } from './aside.mode';
import { NgClass } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ui-aside',
  imports: [NgClass, ButtonComponent],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent {
  @Input() mode: AsideMode = 'side';
  @Input() isSidebarCollapsed = false;
  @Input() isDrawerOpened = false;

  @Output() closeRequest = new EventEmitter<void>();
  @Output() toggleDrawer = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  closeDrawerOnEscape(): void {
    if (this.mode === 'drawer' && this.isDrawerOpened) {
      this.toggleDrawer.emit();
    }
  }

  collapseSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.toggleSidebar.emit();
  }

  onOverlayClick(): void {
    if (this.mode === 'drawer') {
      this.closeRequest.emit();
    }
  }
}
