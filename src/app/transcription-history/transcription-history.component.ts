import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transcription-history',
  templateUrl: './transcription-history.component.html',
  styleUrls: ['./transcription-history.component.scss']
})
export class TranscriptionHistoryComponent {
  transcriptions = [
    { id: 1, text: 'Transcription 1' },
    { id: 2, text: 'Transcription 2' },
    { id: 3, text: 'Transcription 3' },
  ];

  @Output() transcriptionSelected = new EventEmitter<string>();

  onSelect(transcription: string) {
    this.transcriptionSelected.emit(transcription);
  }
}
