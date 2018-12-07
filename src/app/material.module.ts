/* It is better to have a separate module for the Angular Material components we want to use. We then export this module to our app module.
 */
import {NgModule} from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatIconModule],
  exports: [MatButtonModule, MatIconModule]
})
export class MaterialModule {}
