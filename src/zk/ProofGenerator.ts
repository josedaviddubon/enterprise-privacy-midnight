
export type BusinessRuleId =
  | "STOCK_POSITIVO"
  | "MONTO_DENTRO_LIMITE"
  | "USUARIO_AUTORIZADO";

export class ProofGenerator {
  static generateProof(rule: BusinessRuleId, payload: any): string {
    // Simulación: “empaquetamos” la regla + payload en base64.
    // En Midnight real aquí se llamaría a un circuito ZK.
    const json = JSON.stringify({ rule, payload });
    return Buffer.from(json).toString("base64");
  }
}
