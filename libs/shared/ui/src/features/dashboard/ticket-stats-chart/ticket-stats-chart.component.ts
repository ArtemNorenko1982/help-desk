import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TicketStat } from '../mock-data/dashboard.mock';

export type ChartFilter = 'new' | 'in-progress' | 'closed' | null;

interface BarGroup {
  date: string;
  label: string;
  bars: { value: number; height: number; color: string; series: string; x: number }[];
  x: number;
}

@Component({
  selector: 'ui-ticket-stats-chart',
  standalone: true,
  imports: [],
  templateUrl: './ticket-stats-chart.component.html',
  styleUrl: './ticket-stats-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketStatsChartComponent implements OnChanges {
  @Input() stats: TicketStat[] = [];
  @Input() activeFilter: ChartFilter = null;

  readonly svgWidth = 900;
  readonly svgHeight = 280;
  readonly paddingLeft = 40;
  readonly paddingRight = 20;
  readonly paddingTop = 20;
  readonly paddingBottom = 50;

  readonly barWidth = 10;
  readonly barSpacing = 1;
  readonly minBarHeight = 1; // ensures zero-value bars remain visible

  readonly seriesColors: Record<string, string> = {
    new: '#1976d2',
    closed: '#388e3c',
    'in-progress': '#f57c00',
  };

  readonly seriesLabels: Record<string, string> = {
    new: 'New',
    closed: 'Closed',
    'in-progress': 'In Progress',
  };

  barGroups: BarGroup[] = [];
  yTicks: { value: number; y: number }[] = [];
  maxValue = 0;

  get chartWidth(): number {
    return this.svgWidth - this.paddingLeft - this.paddingRight;
  }

  get chartHeight(): number {
    return this.svgHeight - this.paddingTop - this.paddingBottom;
  }

  get activeSeries(): string[] {
    if (this.activeFilter === null) {
      return ['new', 'closed', 'in-progress'];
    }
    return [this.activeFilter];
  }

  get legendItems(): { series: string; label: string; color: string; active: boolean }[] {
    return ['new', 'closed', 'in-progress'].map((s) => ({
      series: s,
      label: this.seriesLabels[s],
      color: this.seriesColors[s],
      active: this.activeFilter === null || this.activeFilter === s,
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stats'] || changes['activeFilter']) {
      this.buildChart();
    }
  }

  private buildChart(): void {
    if (!this.stats || this.stats.length === 0) {
      this.barGroups = [];
      this.yTicks = [];
      return;
    }

    const series = this.activeSeries;
    const groupWidth = this.barWidth * series.length + 6;
    const totalGroups = this.stats.length;
    const availableWidth = this.chartWidth;
    const slotWidth = availableWidth / totalGroups;

    this.maxValue = 0;
    for (const stat of this.stats) {
      if (series.includes('new')) this.maxValue = Math.max(this.maxValue, stat.newCount);
      if (series.includes('closed')) this.maxValue = Math.max(this.maxValue, stat.closedCount);
      if (series.includes('in-progress')) this.maxValue = Math.max(this.maxValue, stat.inProgressCount);
    }
    this.maxValue = Math.max(this.maxValue, 1);

    const niceCeil = Math.ceil(this.maxValue / 2) * 2;
    this.yTicks = Array.from({ length: 5 }, (_, i) => {
      const value = Math.round((niceCeil / 4) * i);
      return {
        value,
        y: this.paddingTop + this.chartHeight - (value / niceCeil) * this.chartHeight,
      };
    });

    this.barGroups = this.stats.map((stat, i) => {
      const groupCenterX = this.paddingLeft + i * slotWidth + slotWidth / 2;
      const startX = groupCenterX - groupWidth / 2;
      const bars = series.map((s, si) => {
        const value = s === 'new' ? stat.newCount : s === 'closed' ? stat.closedCount : stat.inProgressCount;
        const height = (value / niceCeil) * this.chartHeight;
        return {
          value,
          height: Math.max(height, this.minBarHeight),
          color: this.seriesColors[s],
          series: s,
          x: startX + si * (this.barWidth + this.barSpacing),
        } as { value: number; height: number; color: string; series: string; x: number };
      });

      return {
        date: stat.date,
        label: stat.date.slice(5),
        bars,
        x: groupCenterX,
      };
    });
  }

  trackByDate(_: number, item: BarGroup): string {
    return item.date;
  }
}
