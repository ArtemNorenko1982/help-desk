import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';

@Directive({
  selector: '[appIfAuthorized]',
  standalone: true,
})
export class IfAuthorizedDirective {
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly authService = inject(AuthService);
  private isViewCreated = false;

  constructor() {
    effect(() => {
      const isLoggedIn = !!this.authService.currentUser();
      if (isLoggedIn && !this.isViewCreated) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.isViewCreated = true;
      } else if (!isLoggedIn && this.isViewCreated) {
        this.viewContainerRef.clear();
        this.isViewCreated = false;
      }
    });
  }
}
