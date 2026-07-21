import { AfterViewInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-fillout-form',
  standalone: true,
  imports: [],
  templateUrl: './fillout-form.component.html',
  styleUrl: './fillout-form.component.css'
})
export class FilloutFormComponent implements AfterViewInit, OnDestroy {
  testMode = false;
  showThanks = false;
  private filloutFired = false;
  private messageListener?: (e: MessageEvent) => void;
  private filloutObserver?: MutationObserver;

  ngAfterViewInit(): void {
    if (this.testMode) return;
    this.setupFilloutDetection();
    this.loadFilloutScript();
  }

  ngOnDestroy(): void {
    this.filloutObserver?.disconnect();
    if (this.messageListener) {
      window.removeEventListener('message', this.messageListener);
    }
  }

  triggerTestSubmit() {
    this.handleFormSubmit();
  }

  private setupFilloutDetection() {
    this.messageListener = (e: MessageEvent) => {
      if (!e.data || this.filloutFired) return;
      const raw = typeof e.data === 'string' ? e.data : JSON.stringify(e.data);
      if (raw.includes('submit') || raw.includes('Submit') ||
          raw.includes('complete') || raw.includes('Complete') ||
          raw.includes('Gracias') || raw.includes('gracias') ||
          raw.includes('Thank')) {
        this.handleFormSubmit();
      }
    };
    window.addEventListener('message', this.messageListener);

    setTimeout(() => {
      const wrap = document.querySelector('[data-fillout-id]');
      if (wrap) {
        this.filloutObserver = new MutationObserver(() => {
          if (this.filloutFired) return;
          if (wrap.textContent && (
            wrap.textContent.includes('Gracias') ||
            wrap.textContent.includes('gracias') ||
            wrap.textContent.includes('Thank')
          )) {
            this.handleFormSubmit();
          }
        });
        this.filloutObserver.observe(wrap, { childList: true, subtree: true, characterData: true });
      }
    }, 500);
  }

  private handleFormSubmit() {
    if (this.filloutFired) return;
    this.filloutFired = true;
    if (typeof (window as any)['fbq'] === 'function') {
      (window as any)['fbq']('track', 'CompleteRegistration');
    }
    this.showThanks = true;
  }

  closeThanks() {
    this.showThanks = false;
  }

  private loadFilloutScript() {
    if (document.querySelector('script[src*="fillout-embed"]')) return;
    const script = document.createElement('script');
    script.src = '/fillout-embed.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
