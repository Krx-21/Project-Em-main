import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

export interface TrashBin {
  humidity: number;
  temperature: number;
  volume: number;
  timestamp: Date;
}

@Injectable({ providedIn: 'root' })
export class TrashBinService {
  constructor(private fb: FirebaseService) {}

  /**
   * Get single bin data from Realtime Database
   * Maps HUMI, TEMP, VOLUME from root level to TrashBin interface
   */
  async getBinData(): Promise<TrashBin> {
    const data = await this.fb.getSensorData();
    return this.mapToTrashBin(data);
  }

  /**
   * Map Firebase Realtime Database flat structure to TrashBin interface
   */
  private mapToTrashBin(data: any): TrashBin {
    const timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
    const humidity = Number(data.HUMI) || 0;
    const temperature = Number(data.TEMP) || 0;
    const volume = Number(data.VOLUME) || 0;

    return {
      humidity,
      temperature,
      volume,
      timestamp
    };
  }

  /**
   * Update single bin sensor data
   * Writes directly to /HUMI, /TEMP, /VOLUME at root level
   */
  async updateBinData(data: Partial<TrashBin>): Promise<boolean> {
    try {
      const updates: any = {};
      if (data.humidity !== undefined) updates.HUMI = data.humidity;
      if (data.temperature !== undefined) updates.TEMP = data.temperature;
      if (data.volume !== undefined) updates.VOLUME = data.volume;
      if (data.timestamp !== undefined) updates.timestamp = data.timestamp.getTime();

      await this.fb.updateSensorData(updates);
      return true;
    } catch (err) {
      console.error('Error updating bin data:', err);
      return false;
    }
  }

  /**
   * Set complete bin data (overwrites all values)
   */
  async setBinData(data: TrashBin): Promise<boolean> {
    try {
      await this.fb.setSensorData({
        HUMI: data.humidity,
        TEMP: data.temperature,
        VOLUME: data.volume,
        timestamp: data.timestamp.getTime()
      });
      return true;
    } catch (err) {
      console.error('Error setting bin data:', err);
      return false;
    }
  }

  /**
   * Subscribe to real-time changes to single bin data
   * Returns unsubscribe function
   */
  onBinDataChange(callback: (bin: TrashBin) => void): () => void {
    return this.fb.onSensorDataChange((data) => {
      callback(this.mapToTrashBin(data));
    });
  }
}
