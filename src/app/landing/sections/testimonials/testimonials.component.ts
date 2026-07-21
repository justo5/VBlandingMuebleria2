import { AfterViewInit, Component, ElementRef, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonio {
  quote: string;
  name: string;
  sub: string;
  photo: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent implements AfterViewInit {
  @ViewChild('testimonioViewport') viewportRef!: ElementRef<HTMLElement>;
  @ViewChildren('testimonioCard') cardRefs!: QueryList<ElementRef<HTMLElement>>;

  testimonios: Testimonio[] = [
    {
      quote: 'Gracias a Vamos Bien, nuestra clínica creció muchísimo en pacientes y logró consolidarse en Punta del Este.',
      name: 'Bless Estética',
      sub: 'Estética · Punta del Este',
      photo: 'https://lh3.googleusercontent.com/a-/ALV-UjUhiSd4ylKAjU4xlvmtI5oHtRgwYpl9OwQNejq-wooqVG7l7-4F=s96-c0x00000000-cc-rp-mo'
    },
    {
      quote: 'Son excelentes y mi asesor personal siempre está dispuesto a resolver y decirme qué es lo mejor para mi negocio.',
      name: 'Alejandro Bessero',
      sub: 'Automecánica Beljua',
      photo: 'https://lh3.googleusercontent.com/a/ACg8ocJNHQRq53_hkfWZdPw1J8zT5OB7sAr72mzupBdRV9vc0jO_Mg=s96-c0x00000000-cc-rp-mo'
    },
    {
      quote: 'Se nota que saben lo que hacen: entienden el negocio, escuchan de verdad y no aplican recetas genéricas.',
      name: 'Sebastián Estévez',
      sub: 'Cliente Google',
      photo: 'https://lh3.googleusercontent.com/a-/ALV-UjVP0wwvjV1_cvYJqnhHZUUpF42DqCpjAVV5hIaC2hcEbJbE77zz=s96-c0x00000000-cc-rp-mo'
    },
    {
      quote: 'Desde que empezamos a trabajar juntos, no solo aumentaron las ventas, sino que también creció muchísimo la interacción en Instagram.',
      name: 'Ivi Caffaro',
      sub: 'Cliente Google',
      photo: 'https://lh3.googleusercontent.com/a-/ALV-UjUA5l2Bnv7N4nNJ2-8MAXgdWk8OmM_CHDNAQJ5McPnbmzAnmp4D=s96-c0x00000000-cc-rp-mo'
    },
    {
      quote: 'Los chicos de mi equipo de trabajo son súper amables y siempre atentos a la necesidad de mi negocio.',
      name: 'Genora',
      sub: 'Cliente Google',
      photo: 'https://lh3.googleusercontent.com/a-/ALV-UjXKzh3tmtOs8QM3uXSHEolH603_STUZOFilatd6d7Xcc8bVQbc=s96-c0x00000000-cc-rp-mo'
    },
    {
      quote: 'Equipo muy profesional y comprometido. Contratamos el servicio hace 3 meses y estamos muy conformes.',
      name: 'Actividades Acuáticas',
      sub: 'Turismo náutico',
      photo: 'https://lh3.googleusercontent.com/a-/ALV-UjXPWD-kxaQQMkgj-DZHoiD_qxqBmFX_SYW-NsRwMVCZXaJSduA=s96-c0x00000000-cc-rp-mo'
    },
    {
      quote: 'Empecé a vender más. Son atentos y muy humanos. Lo mejor. Vamos para adelante.',
      name: 'Maxi Minali',
      sub: 'Cliente Google',
      photo: 'https://lh3.googleusercontent.com/a-/ALV-UjUpmoLf51Qf4ZtzHyG3dzA9RFHryIQsVh2b-VUETFoRFZ6xWBc=s96-c0x00000000-cc-rp-mo-ba2'
    },
    {
      quote: 'Logré tener ventas constantes, algo que no venía pudiendo conseguir. Fue una excelente decisión.',
      name: 'Euge Soria',
      sub: 'Cliente Google',
      photo: 'https://lh3.googleusercontent.com/a/ACg8ocKl0u0vspdvnFy6yv0MmZvIsBoyul_YyjII8mThxLr6heV__A=s96-c0x00000000-cc-rp-mo-ba2'
    }
  ];

  activeIndex = signal(0);

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.updateActiveFromScroll());
  }

  onScroll() {
    this.updateActiveFromScroll();
  }

  private getStep(): number {
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1000) return 2;
    return 3;
  }

  prev() {
    const current = this.activeIndex();
    if (current <= 0) {
      this.goTo(this.testimonios.length - 1);
      return;
    }
    this.goTo(Math.max(0, current - this.getStep()));
  }

  next() {
    const current = this.activeIndex();
    if (current >= this.testimonios.length - 1) {
      this.goTo(0);
      return;
    }
    this.goTo(Math.min(this.testimonios.length - 1, current + this.getStep()));
  }

  goTo(i: number) {
    const card = this.cardRefs?.toArray()[i]?.nativeElement;
    card?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    this.activeIndex.set(i);
  }

  private updateActiveFromScroll() {
    const viewport = this.viewportRef?.nativeElement;
    const cards = this.cardRefs?.toArray();
    if (!viewport || !cards?.length) return;
    let closest = 0;
    let closestDist = Infinity;
    cards.forEach((c, i) => {
      const dist = Math.abs(c.nativeElement.offsetLeft - viewport.scrollLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    this.activeIndex.set(closest);
  }
}
