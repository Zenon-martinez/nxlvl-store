import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-avatar-modal',
  imports: [MatIcon],
  templateUrl: './avatar-modal.component.html',
  styleUrl: './avatar-modal.component.scss',
})
export class AvatarModalComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<AvatarModalComponent>);

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  close() {
    this.dialogRef.close();
  }
}
