import { Component } from '@angular/core';
import { OpenaiService } from '../openai.service';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-audio-upload',
  templateUrl: './audio-upload.component.html',
  styleUrls: ['./audio-upload.component.scss']
})
export class AudioUploadComponent {

  public files: NgxFileDropEntry[] = [];
  transcription: string = '';

  constructor(private openaiService: OpenaiService) { }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.transcribeFile(file);
        });
      }
    }
  }

  async transcribeFile(file: File) {
    try {
      this.transcription = await this.openaiService.transcribeAudio(file);
    } catch (error) {
      console.error('Error transcribing audio:', error);
    }
  }

  public onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.transcribeFile(file);
    }
  }
}
