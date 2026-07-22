import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NavComponent } from './sections/nav/nav.component';
import { HeroComponent } from './sections/hero/hero.component';
import { TestimonialsComponent } from './sections/testimonials/testimonials.component';
import { ProblemaComponent } from './sections/problema/problema.component';
import { ParadigmaComponent } from './sections/paradigma/paradigma.component';
import { OfertaComponent } from './sections/oferta/oferta.component';
import { BlueprintComponent } from './sections/blueprint/blueprint.component';
import { PlanDelMesComponent } from './sections/plan-del-mes/plan-del-mes.component';
import { SeisMesesComponent } from './sections/seis-meses/seis-meses.component';
import { InversionComponent } from './sections/inversion/inversion.component';
import { CompromisoComponent } from './sections/compromiso/compromiso.component';
import { CalificacionComponent } from './sections/calificacion/calificacion.component';
import { FaqComponent } from './sections/faq/faq.component';
import { DiagnosticoComponent } from './sections/diagnostico/diagnostico.component';
import { FooterComponent } from './sections/footer/footer.component';
import { FixedCtaComponent } from './sections/fixed-cta/fixed-cta.component';
import { InstagramComponent } from './sections/instagram/instagram.component';
import { VideoEmaFranComponent } from './sections/video-ema-fran/video-ema-fran.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NavComponent,
    HeroComponent,
    TestimonialsComponent,
    VideoEmaFranComponent,
    ProblemaComponent,
    ParadigmaComponent,
    OfertaComponent,
    BlueprintComponent,
    PlanDelMesComponent,
    SeisMesesComponent,
    InversionComponent,
    CompromisoComponent,
    CalificacionComponent,
    FaqComponent,
    DiagnosticoComponent,
    InstagramComponent,
    FooterComponent,
    FixedCtaComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('root') rootRef!: ElementRef<HTMLElement>;

  private io?: IntersectionObserver;
  private revealTimeouts: ReturnType<typeof setTimeout>[] = [];

  ngAfterViewInit(): void {
    const root = this.rootRef?.nativeElement;
    if (!root) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reveal = (el: HTMLElement) => el.classList.add('revealed');

    if (!('IntersectionObserver' in window)) {
      els.forEach(reveal);
      return;
    }

    this.io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target as HTMLElement);
          this.io!.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

    els.forEach((el) => this.io!.observe(el));

    const revealVisible = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      els.forEach((el) => {
        if (el.classList.contains('revealed')) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.95 && r.bottom > 0) {
          reveal(el);
          this.io!.unobserve(el);
        }
      });
    };

    requestAnimationFrame(revealVisible);
    this.revealTimeouts.push(setTimeout(revealVisible, 300));
    this.revealTimeouts.push(setTimeout(() => els.forEach(reveal), 2500));
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    this.revealTimeouts.forEach((t) => clearTimeout(t));
  }
}
