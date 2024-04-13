import { SYSTEM_ID, SYSTEM_LABEL, SYSTEM_PATH } from "../constants.mjs";

export interface CohorsConstant {
  systemId: string;
  systemLabel: string;
  systemPath: string;
}

export const COHORS: CohorsConstant = {
  systemId: SYSTEM_ID,
  systemLabel: SYSTEM_LABEL,
  systemPath: SYSTEM_PATH,
};

export class CustomConfig {
  public static register(): void {
    CONFIG.COHORS = COHORS;
  }
}
