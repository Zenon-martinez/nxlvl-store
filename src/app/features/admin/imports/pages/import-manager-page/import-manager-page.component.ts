import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ImportHistoryComponent } from '../../components/import-history/import-history.component';
import { ImportProgressComponent } from '../../components/import-progress/import-progress.component';
import { ImportService } from '../../services/import.service';

interface ImportResponse {
  jobId: string;
  progress?: number;
  status?: string;
  message?: string;
}

@Component({
  selector: 'app-import-manager-page',
  imports: [MatIcon, ImportHistoryComponent, ImportProgressComponent],
  templateUrl: './import-manager-page.component.html',
  styleUrl: './import-manager-page.component.scss',
})
export class ImportManagerPageComponent {
  jobId: string | null = null;
  progress = 0;
  status = '';
  loading = false;
  error: string | null = null;

  constructor(private importService: ImportService) {}

  startImport() {
    this.loading = true;
    this.error = null;

    this.importService.startImport().subscribe({
      next: (res: ImportResponse) => {
        this.jobId = res.jobId;
        this.watchProgress();
      },
      error: () => {
        this.error = 'Error al iniciar importación';
        this.loading = false;
      },
    });
  }

  watchProgress() {
    if (!this.jobId) return;

    this.importService.watchJob(this.jobId).subscribe({
      next: (res) => {
        this.progress = res.progress ?? 0;
        this.status = res.status!;

        if (res.status === 'completed') {
          this.loading = false;
        }

        if (res.status === 'failed') {
          this.error = 'La importación falló';
          this.loading = false;
        }
      },
      error: () => {
        this.error = 'Error consultando progreso';
        this.loading = false;
      },
    });
  }
}
