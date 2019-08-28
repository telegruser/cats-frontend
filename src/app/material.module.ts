import { NgModule } from '@angular/core';
import { MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule, 
        MatButton,
        MatButtonToggle,
        MatRadioGroup,
        MatRadioButton,
        MatButtonToggleModule,
        MatIconModule,
        MatGridTile,
        MatGridList,
        MatGridListModule,
        MatToolbarModule,
        MatButtonModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    // MatRadioGroup,
    // MatRadioButton
    MatButtonToggleModule, MatIconModule,
    // MatGridTile,
    MatGridListModule,
    MatToolbarModule,
    
    MatButtonModule
  ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    // MatRadioGroup,
    // MatRadioButton
    MatButtonToggleModule, MatIconModule,
    // MatGridTile,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule
  ],
  providers: [ MatDatepickerModule ],
})

export class MaterialModule {}