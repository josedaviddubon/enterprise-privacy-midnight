import { PublicRecord } from "../models/PublicRecord";
import { BusinessRuleId } from "../zk/ProofGenerator";
import { ProofEnvelope, ProofVerifier } from "../zk/ProofVerifier";

export interface EnterpriseInput {
  proofs: ProofEnvelope[];
  publicMeta: {
    requestId: string;
    empresa: string;
  };
}

export class EnterpriseContract {
  private requiredRules: BusinessRuleId[] = [
    "STOCK_POSITIVO",
    "MONTO_DENTRO_LIMITE",
    "USUARIO_AUTORIZADO",
  ];

  execute(input: EnterpriseInput) {
    const failedRules: BusinessRuleId[] = [];

    for (const rule of this.requiredRules) {
      const proofForRule = input.proofs.find((p) => p.rule === rule);

      if (!proofForRule) {
        failedRules.push(rule);
        continue;
      }

      const isValid = ProofVerifier.verifyProof(rule, proofForRule.proof);

      if (!isValid) {
        failedRules.push(rule);
      }
    }

    if (failedRules.length > 0) {
      const publicRecord = new PublicRecord(
        `Transacción rechazada. Reglas fallidas: ${failedRules.join(", ")}`
      );

      return {
        status: "rejected" as const,
        failedRules,
        publicRecord,
      };
    }

    const publicRecord = new PublicRecord("Transacción validada");

    return {
      status: "success" as const,
      checkedRules: this.requiredRules,
      publicRecord,
    };
  }
}
