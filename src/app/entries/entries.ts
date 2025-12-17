import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entries.html',
  styleUrls: ['./entries.css']
})
export class Entries {

  entries = [
    { id: 1, name: 'Alice Johnson', gender: 'Female', entry: '11:05 AM', exit: '--', dwell: '--' },
    { id: 2, name: 'Brian Smith', gender: 'Male', entry: '11:03 AM', exit: '--', dwell: '--' },
    { id: 3, name: 'Catherine Lee', gender: 'Female', entry: '11:00 AM', exit: '--', dwell: '--' },
    { id: 4, name: 'David Brown', gender: 'Male', entry: '10:50 AM', exit: '11:10 AM', dwell: '00:20' },
    { id: 5, name: 'Eva White', gender: 'Female', entry: '11:20 AM', exit: '11:30 AM', dwell: '00:10' },
    { id: 6, name: 'Frank Green', gender: 'Male', entry: '11:50 AM', exit: '12:10 PM', dwell: '00:20' },
    { id: 7, name: 'Grace Taylor', gender: 'Female', entry: '10:50 AM', exit: '11:10 AM', dwell: '00:20' },
    { id: 8, name: 'Henry Wilson', gender: 'Male', entry: '10:50 AM', exit: '11:10 AM', dwell: '00:20' },
    { id: 9, name: 'Isabella Martinez', gender: 'Female', entry: '10:50 AM', exit: '11:10 AM', dwell: '00:20' },
    { id: 10, name: 'Jack Thompson', gender: 'Male', entry: '10:50 AM', exit: '11:10 AM', dwell: '00:20' },
    { id: 11, name: 'Katherine Anderson', gender: 'Female', entry: '10:50 AM', exit: '11:10 AM', dwell: '00:20' }
  ];

  pageSize = 5;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.entries.length / this.pageSize);
  }

  get paginatedEntries() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.entries.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  getAvatar(entry: any): string {
    const genderPath = entry.gender === 'Male' ? 'men' : 'women';

    // Use id to keep avatar stable
    const imageIndex = entry.id % 100;

    return `https://randomuser.me/api/portraits/${genderPath}/${imageIndex}.jpg`;
  }
}
