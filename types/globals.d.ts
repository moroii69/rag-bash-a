export {};

export type Roles = "admin" | "user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles; // single-role support
      roles?: Roles[]; // optional for future multi-role support
    };
  }
}
