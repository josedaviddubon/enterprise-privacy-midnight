export class PrivateRecord {
  private data: any;

  constructor(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}
