/* It is better to have a separate module for the Angular Material components we want to use. We then export this module to our app module.
 */
import {NgModule} from '@angular/core';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  exports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule]
})
export class MaterialModule {}
