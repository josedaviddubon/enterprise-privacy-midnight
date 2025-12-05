import { BusinessRuleId } from "./ProofGenerator";

export interface ProofEnvelope {
  rule: BusinessRuleId;
  proof: string;
}

export class ProofVerifier {
  static verifyProof(expectedRule: BusinessRuleId, proof: string): boolean {
    try {
      const decoded = Buffer.from(proof, "base64").toString("utf8");
      const parsed = JSON.parse(decoded);

      // Validamos que la prueba corresponde a la regla esperada
      return parsed.rule === expectedRule;
    } catch {
      return false;
    }
  }
}
