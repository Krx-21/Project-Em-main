import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrashBinService, TrashBin } from './trash-bin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  bin: TrashBin | null = null;
  showEditForm = false;
  unsubscribeFromChanges: (() => void) | null = null;
  Math = Math;

  binForm = {
    humidity: 0,
    temperature: 0,
    volume: 0,
    timestamp: new Date(),
  };

  constructor(private trashBinService: TrashBinService) {}

  async ngOnInit() {
    await this.loadBin();
    this.subscribeToChanges();
  }

  ngOnDestroy() {
    if (this.unsubscribeFromChanges) {
      this.unsubscribeFromChanges();
    }
  }

  /**
   * Load single bin data from Realtime Database
   */
  async loadBin() {
    try {
      this.bin = await this.trashBinService.getBinData();
    } catch (err) {
      console.error('Failed to load bin data:', err);
    }
  }

  /**
   * Subscribe to real-time changes from Realtime Database
   */
  subscribeToChanges() {
    this.unsubscribeFromChanges = this.trashBinService.onBinDataChange((updatedBin) => {
      this.bin = updatedBin;
    });
  }

  openEditForm() {
    if (this.bin) {
      this.binForm = {
        humidity: this.bin.humidity,
        temperature: this.bin.temperature,
        volume: this.bin.volume,
        timestamp: this.bin.timestamp,
      };
    }
    this.showEditForm = true;
  }

  async saveBinData() {
    try {
      const updatedBin: TrashBin = {
        humidity: this.binForm.humidity,
        temperature: this.binForm.temperature,
        volume: this.binForm.volume,
        timestamp: new Date(),
      };
      await this.trashBinService.setBinData(updatedBin);
      this.closeBinForm();
      await this.loadBin();
    } catch (err: any) {
      console.error('Save failed:', err);
      alert('บันทึกข้อมูลล้มเหลว กรุณาลองใหม่');
    }
  }

  closeBinForm() {
    this.showEditForm = false;
  }

  /**
   * Helper to format sensor values for display
   */
  formatValue(value: number): string {
    return value.toFixed(2);
  }

  /**
   * Get volume percentage for visual display
   */
  getVolumePercentage(): number {
    return this.bin ? Math.min(100, Math.max(0, this.bin.volume)) : 0;
  }

  /**
   * Determine volume status color
   */
  getVolumeColor(): string {
    const percentage = this.getVolumePercentage();
    if (percentage >= 80) return '#ef4444';
    if (percentage >= 60) return '#f59e0b';
    return '#10b981';
  }

  /**
   * Determine volume status text
   */
  getVolumeStatus(): string {
    const percentage = this.getVolumePercentage();
    if (percentage >= 90) return '⚠️ เต็มเกือบเต็ม!';
    if (percentage >= 70) return '⚡ ใกล้เต็ม';
    if (percentage >= 50) return '📊 ปานกลาง';
    return '✅ ว่าง';
  }
}
