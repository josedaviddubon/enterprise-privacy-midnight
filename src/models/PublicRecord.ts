export class PublicRecord {
  timestamp: number;
  event: string;

  constructor(event: string) {
    this.timestamp = Date.now();
    this.event = event;
  }
}