import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private BASE_URL = 'https://hiring-dev.internal.kloudspot.com/api/analytics';

  constructor(private http: HttpClient) {}

  getLiveOccupancy() {
    return this.http.post<any>(`${this.BASE_URL}/occupancy`, {});
  }

  getTodayFootfall() {
    return this.http.post<any>(`${this.BASE_URL}/footfall`, {});
  }

  getAverageDwellTime() {
    return this.http.post<any>(`${this.BASE_URL}/dwell`, {});
  }

  getDemographics() {
    return this.http.post<any>(`${this.BASE_URL}/demographics`, {});
  }

  getEntries(page: number, size: number = 10) {
    return this.http.post<any>(
      `${this.BASE_URL}/entry-exit`,
      {
        page,
        size
      }
    );
  }
}
