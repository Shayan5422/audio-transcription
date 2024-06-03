import { Injectable } from '@angular/core';
import axios from 'axios';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private backendUrl = 'http://localhost:5000/api/transcribe';

  constructor(private keycloakService: KeycloakService) {}

  async transcribeAudio(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const token = await this.keycloakService.getToken();

    const response = await axios.post(this.backendUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    return response.data.transcription;
  }
}
