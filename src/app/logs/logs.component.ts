import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

interface EventLogRow {
  id: string;
  Action?: string;
  Device?: string;
  Event_Type?: string;
  Reason?: string;
  Timestamp?: any;
}

interface SensorDataRow {
  id: string;
  DHT22_Humidity_Percent?: number;
  DHT22_Temperature_C?: number;
  Fill_Level_Percent?: number;
  LoadCell_Weight_g?: number;
  MQ135_Gas_Level_ppm?: number;
  Ultrasonic_Distance_cm?: number;
  Timestamp?: any;
}

interface SystemLogRow {
  id: string;
  Log_Level?: string;
  Message?: string;
  Source?: string;
  Timestamp?: any;
}

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  loading = true;
  error: string | null = null;

  eventLogs: EventLogRow[] = [];
  sensorData: SensorDataRow[] = [];
  systemLogs: SystemLogRow[] = [];

  constructor(private firebase: FirebaseService) {}

  async ngOnInit() {
    try {
      // Note: These log collections were from Firestore
      // With Realtime Database, logs are stored at root level
      // Get current sensor data instead
      const currentData = await this.firebase.getSensorData();
      this.sensorData = [{
        id: 'current',
        Ultrasonic_Distance_cm: 0,
        Fill_Level_Percent: currentData.VOLUME || 0,
        LoadCell_Weight_g: 0,
        DHT22_Temperature_C: currentData.TEMP || 0,
        DHT22_Humidity_Percent: currentData.HUMI || 0,
        MQ135_Gas_Level_ppm: 0,
        Timestamp: new Date(currentData.timestamp || Date.now())
      }];
      
      // Legacy log collections no longer available
      this.eventLogs = [];
      this.systemLogs = [];
    } catch (e: any) {
      this.error = e?.message || 'Failed to load data from Realtime Database';
    } finally {
      this.loading = false;
    }
  }

  toLocalString(ts: any): string {
    // Firebase Timestamp has toDate(); also support Date or string
    try {
      if (!ts) return '-';
      if (typeof ts?.toDate === 'function') return ts.toDate().toLocaleString();
      const d = ts instanceof Date ? ts : new Date(ts);
      return isNaN(d.getTime()) ? '-' : d.toLocaleString();
    } catch {
      return '-';
    }
  }
}
