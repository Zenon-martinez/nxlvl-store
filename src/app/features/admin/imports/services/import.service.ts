import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, switchMap } from 'rxjs';

interface ImportJobStatus {
  id: string;
  status: string;
  progress?: number;
}

interface ImportResponse {
  jobId: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImportService {
  constructor(private http: HttpClient) {}

  startImport() {
    return this.http.post<ImportResponse>('/api/import/pokemon', {});
  }

  getStatus(jobId: string) {
    return this.http.get<ImportJobStatus>(`/api/import/${jobId}`);
  }

  watchJob(jobId: string) {
    return interval(2000).pipe(switchMap(() => this.getStatus(jobId)));
  }
}
