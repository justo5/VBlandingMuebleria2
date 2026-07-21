import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CasoExito {
  src: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('casoVideoRef') casoVideoRefs!: QueryList<ElementRef<HTMLVideoElement>>;
  @ViewChildren('videoCardRef') videoCardRefs!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('videoViewportRef') videoViewportRef!: ElementRef<HTMLElement>;

  casosVideo: CasoExito[] = [
    { src: 'resources/muebles/instagram_DXlAO8XDKIK.mp4' },
    { src: 'resources/muebles/instagram_DWNQXcmjEkm.mp4' },
    { src: 'resources/muebles/instagram_DUb8PnlDCC9.mp4' },
    { src: 'resources/muebles/instagram_DXDeYo1jIdh.mp4' },
    { src: 'resources/muebles/instagram_DYYQpWphWue.mp4' },
  ];

  activeVideoIndex = signal(0);
  playingVideoIndex = signal(-1);
  videoTrackOffset = signal(0);
  private videoObserver?: IntersectionObserver;
  private videoResizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    this.setupVideoOffscreenObserver();
    this.setupVideoResizeObserver();
    requestAnimationFrame(() => {
      this.updateVideoOffset();
      this.playActiveVideoMuted();
    });
  }

  ngOnDestroy(): void {
    this.videoObserver?.disconnect();
    this.videoResizeObserver?.disconnect();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateVideoOffset();
  }

  private setupVideoResizeObserver() {
    const viewport = this.videoViewportRef?.nativeElement;
    if (!viewport || typeof ResizeObserver === 'undefined') return;
    this.videoResizeObserver = new ResizeObserver(() => this.updateVideoOffset());
    this.videoResizeObserver.observe(viewport);
  }

  private updateVideoOffset() {
    const card = this.videoCardRefs?.toArray()[this.activeVideoIndex()]?.nativeElement;
    const viewport = this.videoViewportRef?.nativeElement;
    if (!card || !viewport) return;
    const vpWidth = viewport.clientWidth;
    this.videoTrackOffset.set(vpWidth / 2 - card.offsetLeft - card.offsetWidth / 2);
  }

  private setupVideoOffscreenObserver() {
    this.videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement;
        const idx = this.casoVideoRefs.toArray().findIndex(ref => ref.nativeElement === video);
        if (!entry.isIntersecting) {
          video.pause();
          if (idx === this.playingVideoIndex()) this.playingVideoIndex.set(-1);
        } else if (idx === this.activeVideoIndex() && this.playingVideoIndex() === -1) {
          video.muted = true;
          video.play().catch(() => { });
        }
      });
    }, { threshold: 0.1 });

    this.casoVideoRefs.forEach(ref => this.videoObserver!.observe(ref.nativeElement));
  }

  private playActiveVideoMuted() {
    const video = this.casoVideoRefs?.toArray()[this.activeVideoIndex()]?.nativeElement;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => { });
  }

  prevVideo() {
    const next = (this.activeVideoIndex() - 1 + this.casosVideo.length) % this.casosVideo.length;
    this.goToVideo(next);
  }

  nextVideo() {
    const next = (this.activeVideoIndex() + 1) % this.casosVideo.length;
    this.goToVideo(next);
  }

  goToVideo(i: number) {
    if (i === this.activeVideoIndex()) return;
    this.activeVideoIndex.set(i);
    this.pauseAllVideos();
    queueMicrotask(() => {
      this.updateVideoOffset();
      this.playActiveVideoMuted();
    });
  }

  toggleVideoPlay(i: number, event: Event) {
    event.stopPropagation();
    if (i !== this.activeVideoIndex()) {
      this.goToVideo(i);
      return;
    }
    const video = this.casoVideoRefs.toArray()[i]?.nativeElement;
    if (!video) return;
    if (this.playingVideoIndex() === i) {
      video.pause();
      this.playingVideoIndex.set(-1);
      return;
    }
    video.muted = false;
    video.play().then(() => {
      this.playingVideoIndex.set(i);
    }).catch(() => {
      video.muted = true;
      video.play().then(() => { this.playingVideoIndex.set(i); }).catch(() => { });
    });
  }

  private pauseAllVideos() {
    this.casoVideoRefs?.forEach(ref => {
      ref.nativeElement.pause();
      ref.nativeElement.muted = true;
      ref.nativeElement.currentTime = 0;
    });
    this.playingVideoIndex.set(-1);
  }
}
