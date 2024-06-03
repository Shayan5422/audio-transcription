import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class KeycloakInitService {
  constructor(private keycloakService: KeycloakService) {}

  init(): Promise<void> {
    return this.keycloakService
      .init({
        config: {
          url: 'http://localhost:8080',
          realm: 'voic',
          clientId: 'angular-app',
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false,
        },
      })
      .then(() => {})
      .catch((error) => {
        console.error('Keycloak initialization failed', error);
        throw error;
      });
  }
}
