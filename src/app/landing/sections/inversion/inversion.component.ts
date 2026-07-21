import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PlanFeature {
  label: string;
  included: boolean;
}

interface Plan {
  name: string;
  tag: string;
  price: number;
  desc: string;
  features: PlanFeature[];
  bonus?: string;
  popular?: boolean;
}

@Component({
  selector: 'app-inversion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inversion.component.html',
  styleUrl: './inversion.component.css'
})
export class InversionComponent {
  plans: Plan[] = [
    {
      name: 'Focus',
      tag: 'Solo gestión',
      price: 350,
      popular: true,
      desc: 'Tenés creatividades propias. Nosotros ponemos la estrategia y optimizamos cada peso en Meta.',
      features: [
        { label: 'Gestión Meta Ads', included: true },
        { label: 'Plan del Mes', included: true },
        { label: 'Soporte WhatsApp', included: true },
        { label: 'Creatividades', included: false },
        { label: 'Bot IA WhatsApp', included: false }
      ]
    },
    {
      name: 'Creativo',
      tag: 'Gestión + Creatividades',
      price: 490,
      desc: 'No sabés diseñar ni editar. Nosotros creamos los anuncios y los gestionamos. Vos solo recibís consultas.',
      features: [
        { label: 'Gestión Meta Ads', included: true },
        { label: 'Plan del Mes', included: true },
        { label: 'Soporte WhatsApp', included: true },
        { label: 'Creatividades para anuncios', included: true },
        { label: 'Bot IA WhatsApp', included: false }
      ]
    },

    {
      name: 'Growth',
      tag: 'Sistema completo',
      price: 690,
      desc: 'Delegás todo: anuncios, creatividades y automatización. Tu mueblería vende mientras dormís.',
      features: [
        { label: 'Gestión Meta Ads', included: true },
        { label: 'Plan del Mes', included: true },
        { label: 'Soporte WhatsApp', included: true },
        { label: 'Creatividades para anuncios', included: true },
        { label: 'Bot IA 24/7 · califica leads', included: true }
      ],
      bonus: 'Setup IA bonificado'
    }
  ];

  baseIncludes: PlanFeature[] = [
    { label: 'Diagnóstico estratégico', included: true },
    { label: 'Seguimiento y optimización', included: true },
    { label: 'Análisis de datos', included: true },
    { label: 'Revisión de calidad de consultas', included: true },
    { label: 'Recomendaciones comerciales', included: true },
    { label: 'Comunicación y acompañamiento', included: true }
  ];

  activeIndex = 0;

  get activePlan(): Plan {
    return this.plans[this.activeIndex];
  }

  get activeIncludes(): PlanFeature[] {
    return [...this.baseIncludes, ...this.activePlan.features];
  }

  prev(): void {
    this.activeIndex = (this.activeIndex - 1 + this.plans.length) % this.plans.length;
  }

  next(): void {
    this.activeIndex = (this.activeIndex + 1) % this.plans.length;
  }

  goTo(i: number): void {
    this.activeIndex = i;
  }
}
