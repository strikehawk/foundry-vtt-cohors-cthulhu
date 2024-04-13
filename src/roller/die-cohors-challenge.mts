import { SYSTEM_PATH } from "../constants.mjs";

const ASSETS_PATH = `${SYSTEM_PATH}/assets/dice/challenge-die`;

export type ChallengeDieResult = DiceTermResult & { effect: boolean };

export class DieCohorsChallenge extends Die {
  public static override DENOMINATION = "f";

  public static readonly faceTextures = [
    `${ASSETS_PATH}/d1.webp`,
    `${ASSETS_PATH}/d2.webp`,
    `${ASSETS_PATH}/d3.webp`,
    `${ASSETS_PATH}/d4.webp`,
    `${ASSETS_PATH}/d5.webp`,
    `${ASSETS_PATH}/d6.webp`,
  ];

  public static readonly values: Record<number, number | string> = {
    1: 1,
    2: 2,
    3: 0,
    4: 0,
    5: `<img width='24' height='24' style='border: none' src="${ASSETS_PATH}/d5.webp" />`,
    6: `<img width='24' height='24' style='border: none' src="${ASSETS_PATH}/d6.webp" />`,
  };

  public static getValue(dieSide: number): number {
    // 1 if Effect, otherwise take the value
    return typeof DieCohorsChallenge.values[dieSide] === "string"
      ? 1
      : (DieCohorsChallenge.values[dieSide] as number);
  }

  constructor(termData: Partial<DieData>) {
    termData.faces = 6;
    super(termData);
  }

  public override getResultLabel(result: DiceTermResult): string {
    let label: string = "";

    switch (result.result) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        label = `<img src="${ASSETS_PATH}/d${result.result}.webp" />`;
        break;
    }

    return label;
  }

  public override getResultCSS(result: DiceTermResult): (string | null)[] {
    const classes = ["diecohorsdamage"];

    switch (result.result) {
      case 5:
      case 6:
        classes.push("effect");
        break;
      default:
        break;
    }

    return classes;
  }

  public override get total(): number | undefined {
    if (!this._evaluated) return undefined;

    return this.results.reduce((t, r) => {
      if (!r.active) return t;
      if (r.count !== undefined) return t + r.count;
      return t + DieCohorsChallenge.getValue(r.result);
    }, 0);
  }

  public override roll(options?: {
    minimize: boolean;
    maximize: boolean;
  }): ChallengeDieResult {
    const roll = super.roll(options) as ChallengeDieResult;
    roll.effect = roll.result === 5 || roll.result === 6;
    return roll;
  }

  public get resultValues(): string[] {
    return this.results.map((result) => {
      return this.getResultLabel(result);
    });
  }
}
