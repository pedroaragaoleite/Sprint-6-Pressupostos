import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from '../home/home.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [FontAwesomeModule, HomeComponent, ReactiveFormsModule, ModalComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  faCircleExclamation = faCircleExclamation;

  @Input() serviciosParentForm: FormGroup = new FormGroup({});

  public get canDecrease()  {
    return this.serviciosParentForm.controls['pagesNum'].value > 1 || this.serviciosParentForm.controls['languagesNum'].value > 1;
  }

  increment(controlName: string): void {
    const controlN = this.serviciosParentForm.get(controlName);
    if(controlN) {
      console.log(controlN.value);
      const incValue = controlN.value;
      controlN.setValue( incValue + 1)      
    }       
  }

  decrease(controlName: string):void {
    const controlN = this.serviciosParentForm.get(controlName);
    if(controlN) {
      const decValue = controlN.value;
      controlN.setValue(decValue - 1);
    }
  }

}
