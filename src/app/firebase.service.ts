import { Injectable } from '@angular/core';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getDatabase,
  type Database,
  ref,
  get,
  set,
  update,
  onValue,
  off,
  type DataSnapshot,
  type Unsubscribe
} from 'firebase/database';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private app: FirebaseApp;
  private db: Database;

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
  }

  /**
   * Get single bin sensor data from root level (flat structure)
   * Structure: { HUMI, TEMP, VOLUME, timestamp? }
   */
  async getSensorData() {
    try {
      const dbRef = ref(this.db, '/');
      const snapshot = await get(dbRef);
      return snapshot.val() || { HUMI: 0, TEMP: 0, VOLUME: 0 };
    } catch (err) {
      console.error('Error reading sensor data:', err);
      return { HUMI: 0, TEMP: 0, VOLUME: 0 };
    }
  }

  /**
   * Update single bin sensor data
   * Data will be merged at root level: /HUMI, /TEMP, /VOLUME
   */
  async updateSensorData(data: {
    HUMI?: number;
    TEMP?: number;
    VOLUME?: number;
    timestamp?: number;
  }) {
    try {
      const dbRef = ref(this.db, '/');
      const updates: any = {};
      if (data.HUMI !== undefined) updates.HUMI = data.HUMI;
      if (data.TEMP !== undefined) updates.TEMP = data.TEMP;
      if (data.VOLUME !== undefined) updates.VOLUME = data.VOLUME;
      if (data.timestamp !== undefined) updates.timestamp = data.timestamp;
      
      await update(dbRef, updates);
      return true;
    } catch (err) {
      console.error('Error updating sensor data:', err);
      throw err;
    }
  }

  /**
   * Set complete sensor data (overwrites existing data at root)
   */
  async setSensorData(data: { HUMI: number; TEMP: number; VOLUME: number; timestamp?: number }) {
    try {
      const dbRef = ref(this.db, '/');
      await set(dbRef, {
        HUMI: data.HUMI,
        TEMP: data.TEMP,
        VOLUME: data.VOLUME,
        timestamp: data.timestamp || Date.now()
      });
      return true;
    } catch (err) {
      console.error('Error setting sensor data:', err);
      throw err;
    }
  }

  /**
   * Subscribe to real-time sensor data changes
   * Returns unsubscribe function
   */
  onSensorDataChange(callback: (data: any) => void): Unsubscribe {
    const dbRef = ref(this.db, '/');
    return onValue(dbRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val() || { HUMI: 0, TEMP: 0, VOLUME: 0 };
      callback(data);
    }, (error) => {
      console.error('Error listening to sensor data:', error);
    });
  }
}
