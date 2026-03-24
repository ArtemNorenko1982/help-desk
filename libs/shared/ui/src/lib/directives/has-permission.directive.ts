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
  // 03/17/2026
  // TODO: replace the whole logic with a proper implementsation
  // AI tools are not good at this point - extremely complex logic
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
