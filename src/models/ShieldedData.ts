export class ShieldedData<T> {
  private readonly payload: T;
  private readonly id: string;
  private readonly createdAt: number;

  constructor(payload: T) {
    this.payload = payload;
    this.createdAt = Date.now();
    this.id = `${this.createdAt}-${Math.random().toString(16).slice(2)}`;
  }

  getId(): string {
    return this.id;
  }

  getCreatedAt(): number {
    return this.createdAt;
  }

  /**
   * Snapshot para generar pruebas.
   * En Midnight real, esto se convertiría en un “witness” ZK,
   * no se mandaría tal cual a la red.
   */
  getSnapshotForProof(): T {
    return this.payload;
  }

  /**
   * Revelar los datos completos (para auditorías internas).
   * En un escenario real, estaría protegido por permisos/clave.
   */
  reveal(): T {
    return this.payload;
  }
}
