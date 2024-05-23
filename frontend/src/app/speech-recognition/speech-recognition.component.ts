import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  AfterViewInit,
} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
declare var webkitSpeechRecognition: any;
@Component({
  selector: 'app-speech-recognition',
  standalone: true,
  imports: [],
  templateUrl: './speech-recognition.component.html',
  styleUrl: './speech-recognition.component.scss',
})
export class SpeechRecognitionComponent implements OnInit, AfterViewInit {
  recognition: any;
  transcript = '';
  timeoutId: any;
  start = false;
  startRecognition = true;
  stopClickRecognation = false;
  @ViewChild('closeModel4') closeModel4!: ElementRef;
  @ViewChild('modal4') modal4!: ElementRef;
  @Input({ alias: 'switch', required: true }) switch: boolean = false;
  @Output('closed') closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}
  ngAfterViewInit(): void {
    this.modal4.nativeElement.click();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const SpeechRecognition =
        window.SpeechRecognition || webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error('Speech Recognition not supported in this browser.');
        return;
      }
      this.recognition = new SpeechRecognition();
      this.recognition.interimResults = true;
      this.recognition.lang = 'ar-SA';
      this.recognition.addEventListener('result', (event: any) => {
        this.transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
      });
    }
    this.recognition.addEventListener('end', () => {
      this.close();
      this.startRecognition = false;
    });
    this.recognition.addEventListener('error', (event: any) => {
      console.error('Speech Recognition error:', event.error);
    });
    this.recognition.addEventListener('start', (event: any) => {
      this.startRecognition = true;
    });

    this.startListening();
  }

  startListening(): void {
    if (this.recognition) {
      this.recognition.start();
    }
  }

  stopListening(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
  startListeningButton() {
    this.start = !this.start;
    this.startListening();
  }

  stopListeningButton() {
    this.stopClickRecognation = true;
    this.start = !this.start;
    this.transcript = '';
    this.stopListening();
    this.cancelClose();
  }

  closeModel() {
    this.closed.emit(true);
  }
  ngOnDestroy(): void {
    this.stopListening();
    if (this.recognition) {
      this.recognition = null;
    }
  }
  close(): void {
    this.timeoutId = setTimeout(() => {
      this.closeModel4.nativeElement.click();
    }, 1500);
  }

  cancelClose(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
  changestartRecognition() {
    this.startRecognition = false;
  }
}
