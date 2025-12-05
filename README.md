# EPM – Enterprise Privacy Mock (inspirado en Midnight / Cardano)

Este proyecto es un **prototipo de arquitectura de privacidad empresarial** inspirado en el modelo de Midnight (sidechain de privacidad de Cardano), desarrollado en **TypeScript**.

Lo que busca hacer es:  
-Los datos sensibles nunca se exponen directamente.  
-El “contrato” solo recibe **pruebas** y **metadatos públicos**.  
-Se puede validar el cumplimiento de reglas de negocio **sin ver la información privada**.

---

## Objetivo

Simular cómo podría funcionar una integración empresarial con Midnight:

- Datos privados (inventarios, costos, operadores, etc.) se manejan como `ShieldedData`.
- A partir de esos datos se generan **pruebas** (`proofs`) asociadas a reglas de negocio.
- Un contrato (`EnterpriseContract`) verifica múltiples pruebas y emite solo un registro público.
- La capa de aplicación puede, opcionalmente, revelar los datos privados solo en auditorías internas.

---
