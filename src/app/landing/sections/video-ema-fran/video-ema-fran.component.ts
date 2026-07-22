import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-ema-fran',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-ema-fran.component.html',
  styleUrl: './video-ema-fran.component.css'
})
export class VideoEmaFranComponent {
  @ViewChild('videoRef') videoRef!: ElementRef<HTMLVideoElement>;

  isPlaying = signal(false);

  togglePlay(event?: Event) {
    event?.stopPropagation();
    const video = this.videoRef?.nativeElement;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => this.isPlaying.set(true)).catch(() => { });
    } else {
      video.pause();
      this.isPlaying.set(false);
    }
  }

  onVideoEnded() {
    this.isPlaying.set(false);
  }
}
