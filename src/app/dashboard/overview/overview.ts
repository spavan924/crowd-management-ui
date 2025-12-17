import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(annotationPlugin);

@Component({
  selector: 'app-overview',
  templateUrl: './overview.html',
  styleUrls: ['./overview.css']
})

export class overview implements AfterViewInit {

  occupancyLabels: string[] = [
    '8:00', '9:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  occupancyData: number[] = [
    150, 155, 160, 170, 165, 175, 180, 190, 185, 180
  ];


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initOccupancyChart();
      this.initDemographicsDonut();
      this.initDemographicsLine();
    });
  }  

  /* =======================
     OVERALL OCCUPANCY CHART
     ======================= */
  initOccupancyChart() {
    const canvas = document.getElementById('occupancyChart') as HTMLCanvasElement;
    if (!canvas) return;

    // 🔥 LIVE marker time = last label
    const currentTime =
      this.occupancyLabels[this.occupancyLabels.length - 1];

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: this.occupancyLabels,
        datasets: [{
          label: 'Occupancy',
          data: this.occupancyData,
          borderColor: '#22d3ee',
          backgroundColor: 'rgba(34,211,238,0.15)',
          fill: true,
          tension: 0.4,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },

          /* 🔴 LIVE VERTICAL MARKER */
          annotation: {
            annotations: {
              liveLine: {
                type: 'line',
                xMin: currentTime,
                xMax: currentTime,
                borderColor: '#ef4444',
                borderWidth: 2,
                borderDash: [6, 6],
                label: {
                  display: true,
                  content: 'LIVE',
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  position: 'start',
                  yAdjust: -10,
                  font: {
                    size: 10,
                    weight: 'bold'
                  },
                  padding: 6,
                  borderRadius: 6
                }
              }
            }
          }
        },
        scales: {
          x: {
            ticks: { color: '#94a3b8' },
            grid: { display: false }
          },
          y: {
            ticks: { color: '#94a3b8' },
            grid: { color: 'rgba(255,255,255,0.08)' }
          }
        }
      }
    });
  }

  /* =======================
     DEMOGRAPHICS DONUT
     ======================= */
  initDemographicsDonut() {
    const canvas = document.getElementById('demographicsDonut') as HTMLCanvasElement;
    if (!canvas) return;

    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Male', 'Female'],
        datasets: [{
          data: [55, 45],
          backgroundColor: ['#22d3ee', '#94a3b8'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  /* =======================
     DEMOGRAPHICS ANALYSIS
     ======================= */
  initDemographicsLine() {
    const canvas = document.getElementById('demographicsLine') as HTMLCanvasElement;
    if (!canvas) return;

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00'],
        datasets: [
          {
            label: 'Male',
            data: [180, 185, 190, 200, 195, 205],
            borderColor: '#22d3ee',
            tension: 0.4,
            pointRadius: 0
          },
          {
            label: 'Female',
            data: [140, 145, 150, 155, 150, 160],
            borderColor: '#94a3b8',
            tension: 0.4,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#cbd5f5' }
          }
        },
        scales: {
          x: {
            ticks: { color: '#94a3b8' },
            grid: { display: false }
          },
          y: {
            min: 0,          // 👈 start from 0
            max: 330,        // 👈 end at 330
            ticks: {
              stepSize: 55,  // 👈 custom interval
              color: '#94a3b8'
            },
            grid: {
              color: 'rgba(255,255,255,0.08)'
            }
          }
        }
      }
    });
  }
}
