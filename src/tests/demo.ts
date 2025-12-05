// src/tests/demo.ts
import { ShieldedData } from "../models/ShieldedData";
import { EnterpriseContract } from "../contracts/EnterpriseContract";
import { BusinessRuleId, ProofGenerator } from "../zk/ProofGenerator";
import { ProofEnvelope } from "../zk/ProofVerifier";

interface TransactionPayload {
  ItemCode: string;
  cantidad: number;
  costo: number;
  operadoPor: string;
}

const payload: TransactionPayload = {
  ItemCode: "RI0040",
  cantidad: 20,
  costo: 1500,
  operadoPor: "user_sap",
};

// Datos privados “blindados”
const shielded = new ShieldedData<TransactionPayload>(payload);

// El cliente genera las pruebas para cada regla de negocio
const rulesToProve: BusinessRuleId[] = [
  "STOCK_POSITIVO",
  "MONTO_DENTRO_LIMITE",
  "USUARIO_AUTORIZADO",
];

const proofs: ProofEnvelope[] = rulesToProve.map((rule) => ({
  rule,
  proof: ProofGenerator.generateProof(rule, shielded.getSnapshotForProof()),
}));

// El contrato SOLO recibe pruebas + metadatos públicos
const contract = new EnterpriseContract();

const resultado = contract.execute({
  proofs,
  publicMeta: {
    requestId: shielded.getId(),
    empresa: "Didac Foods",
  },
});

console.log("Resultado final (sin exponer datos privados):");
console.log(JSON.stringify(resultado, null, 2));

// Si quisieras, en auditoría interna, puedes revelar:
console.log("\n[DEBUG interna] Payload privado revelado solo en backend:");
console.log(shielded.reveal());
