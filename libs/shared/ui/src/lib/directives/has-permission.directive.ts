import {
  Directive,
  effect,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { AuthStateService } from '@shared-ui';

@Directive({
  selector: '[dirHasPermission]',
  standalone: true,
})
export class HasPermissionDirective {
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly authStateService = inject(AuthStateService);
  private isViewCreated = false;

  constructor() {
    effect(() => {
      const isLoggedIn = !!this.authStateService.currentUser;
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
