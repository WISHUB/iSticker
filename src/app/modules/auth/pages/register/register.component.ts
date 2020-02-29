import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  public registerForm: FormGroup;
  public hidePassword: boolean;
  public sending: boolean;

  constructor(private formBuilder: FormBuilder) {
    this._createForm();
    this.hidePassword = true;
    this.sending = false;
  }

  private _createForm(): void {
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      password_confirmation: [null, Validators.required]
    });
  }

  onSubmit(data: any): void {

    this.sending = true;

    if (this.registerForm.valid) {
      // this.sending = false;
    } else {
      // Formulario inválido
    }

  }
}
