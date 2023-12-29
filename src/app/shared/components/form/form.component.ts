import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Input() fieldNames: string[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      dynamicFields: this.fb.array([]),
    });
  }

  get dynamicFields(): FormArray {
    return this.form.get('dynamicFields') as FormArray<FormControl<any>>;
  }

  ngOnInit() {
    this.fieldNames.forEach((fieldName) => this.addField(fieldName));
  }

  addField(fieldName: string) {
    const control = this.fb.control('', Validators.required);
    this.dynamicFields.push(control);
  }

  removeField(index: number) {
    this.dynamicFields.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted with data:', this.form.value);
    }
  }
}
