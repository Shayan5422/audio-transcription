import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { KeycloakInitService } from './keycloak.service';
import { HttpClientModule } from '@angular/common/http';
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { AccountComponent } from './account/account.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { TranscriptionHistoryComponent } from './transcription-history/transcription-history.component';
import { NgxFileDropModule } from 'ngx-file-drop';

function initializeKeycloak(keycloak: KeycloakInitService) {
  return () => keycloak.init();
}

@NgModule({
  declarations: [
    AppComponent,
    AudioUploadComponent,
    AccountComponent,
    TranscriptionHistoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    KeycloakAngularModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    NgxFileDropModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakInitService],
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Add this line to support web components
  bootstrap: [AppComponent],
})
export class AppModule {}
