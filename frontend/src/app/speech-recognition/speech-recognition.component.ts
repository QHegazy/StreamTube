import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { VoiceRecognitionService } from '../services/voiceRecognition/voice-recognition.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-speech-recognition',
  standalone: true,
  imports: [],
  templateUrl: './speech-recognition.component.html',
  styleUrl: './speech-recognition.component.scss',
})
export class SpeechRecognitionComponent {
  constructor() {
    if (typeof window !== 'undefined') {
      if ('SpeechRecognition' in window) {
        console.log('SpeechRecognition is supported');
      } else if ('webkitSpeechRecognition' in window) {
        console.log('webkitSpeechRecognition is supported');
      } else {
        console.log('SpeechRecognition is not supported');
      }
    } else {
      console.log('This is not a browser environment');
    }
  }

  // public searchForm: FormGroup;
  // public isUserSpeaking: boolean = false;
  // constructor(
  //   private fb: FormBuilder,
  //   private voiceRecognition: VoiceRecognitionService
  // ) {
  //   // Initialize form group.
  //   this.searchForm = this.fb.group({
  //     searchText: ['', Validators.required],
  //   });
  // }

  // ngOnInit(): void {
  //   this.initVoiceInput();
  // }

  // /**
  //  * @description Function to stop recording.
  //  */
  // stopRecording() {
  //   this.voiceRecognition.stop();
  //   this.isUserSpeaking = false;
  // }

  // initVoiceInput() {
  //   // Subscription for initializing and this will call when user stopped speaking.
  //   this.voiceRecognition.init().subscribe(() => {
  //     // User has stopped recording
  //     // Do whatever when mic finished listening
  //   });

  //   // Subscription to detect user input from voice to text.
  //   this.voiceRecognition.speechInput().subscribe((input) => {
  //     // Set voice text output to
  //     // Set voice text output to
  //     this.searchForm.controls['searchText'].setValue(input);
  //   });
  // }

  // startRecording() {
  //   this.isUserSpeaking = true;
  //   this.voiceRecognition.start();
  //   this.searchForm.controls['searchText'].reset();
  // }
}
