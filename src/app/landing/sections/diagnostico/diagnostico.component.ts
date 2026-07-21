import { Component } from '@angular/core';
import { FilloutFormComponent } from './fillout-form/fillout-form.component';

@Component({
  selector: 'app-diagnostico',
  standalone: true,
  imports: [FilloutFormComponent],
  templateUrl: './diagnostico.component.html',
  styleUrl: './diagnostico.component.css'
})
export class DiagnosticoComponent {
}
