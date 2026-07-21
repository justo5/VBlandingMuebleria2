import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Faq {
  pregunta: string;
  respuesta: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  openFaq = -1;

  readonly faqs: Faq[] = [
    {
      pregunta: '¿El primer mes es completamente gratis?',
      respuesta: 'Durante el primer mes están bonificados únicamente los honorarios de Vamos Bien. La inversión publicitaria se abona desde el primer día directamente a Meta.'
    },
    {
      pregunta: '¿Cuándo realizo el primer pago?',
      respuesta: 'Tu primer pago a Vamos Bien se realiza al comenzar el segundo mes. Desde ese momento, los honorarios son de USD 350 mensuales más IVA.'
    },
    {
      pregunta: '¿Por qué debo comprometerme durante seis meses?',
      respuesta: 'Porque el primer mes se utiliza para implementar, los siguientes para validar y luego comenzamos a consolidar aprendizajes y crecimiento. No sería profesional prometer que en algunos días se puede diagnosticar, probar, aprender y optimizar todo un sistema de captación.'
    },
    {
      pregunta: '¿Garantizan una cantidad determinada de ventas?',
      respuesta: 'No garantizamos una cifra específica de ventas. Los resultados también dependen del producto, precio, competencia, presupuesto, mercado y capacidad comercial de la mueblería. Sí nos comprometemos con un proceso profesional de diagnóstico, estrategia, implementación, seguimiento y optimización.'
    },
    {
      pregunta: '¿Qué sucede si ya trabajo con otra agencia?',
      respuesta: 'Si estás completamente conforme con su trabajo y sus resultados, no tiene sentido cambiar. Si sentís que existe margen para mejorar el foco, el orden, la estrategia o la calidad de las oportunidades, podemos mostrarte nuestra metodología.'
    },
    {
      pregunta: '¿La inversión publicitaria está incluida en los USD 350?',
      respuesta: 'No. La inversión publicitaria se abona directamente a Meta y es independiente de nuestros honorarios.'
    },
    {
      pregunta: '¿Puedo trabajar solamente durante el primer mes bonificado?',
      respuesta: 'No. La bonificación corresponde al inicio de un proceso profesional de seis meses. No está planteada como una prueba aislada para utilizar el primer mes y retirarse.'
    },
    {
      pregunta: '¿Qué pasa si no entrego los accesos o materiales?',
      respuesta: 'Para acceder y mantener el beneficio, necesitamos que la mueblería entregue la información, accesos y materiales acordados en los tiempos establecidos. El crecimiento requiere compromiso de ambas partes.'
    }
  ];

  toggleFaq(i: number): void {
    this.openFaq = this.openFaq === i ? -1 : i;
  }
}
