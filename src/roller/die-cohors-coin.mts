import { SYSTEM_PATH } from "../constants.mjs";

const ASSETS_PATH = `${SYSTEM_PATH}/assets/dice/coin`;

export class DieCohorsCoin extends Coin {
  public static override DENOMINATION: "c";

  public static readonly faceTextures = [
    `${ASSETS_PATH}/heads.webp`,
    `${ASSETS_PATH}/tails.webp`,
  ];

  public static readonly values: Record<number, number | string> = {
    1: `<img width='24' height='24' style='border: none' src="${ASSETS_PATH}/heads.webp" />`,
    2: `<img width='24' height='24' style='border: none' src="${ASSETS_PATH}/tails.webp" />`,
  };

  public static getValue(dieSide: number): number {
    return dieSide === 1 ? 1 : 0;
  }

  constructor(termData: Partial<CoinData>) {
    termData.faces = 2;
    super(termData);
  }

  public override getResultLabel(result: DiceTermResult): string {
    let label: string = "";

    switch (result.result) {
      case 1:
        label = `<img src="${ASSETS_PATH}/heads-label.webp" />`;
        break;
      case 2:
        label = `<img src="${ASSETS_PATH}/tails-label.webp" />`;
        break;
    }

    return label;
  }

  public override getResultCSS(result: DiceTermResult): string[] {
    const classes = ["diecohorscoin"];

    return classes;
  }

  public override get total(): number | undefined {
    if (!this._evaluated) return undefined;

    return this.results.reduce((t, r) => {
      if (!r.active) return t;
      if (r.count !== undefined) return t + r.count;
      return t + DieCohorsCoin.getValue(r.result);
    }, 0);
  }

  public override roll(options?: {
    minimize: boolean;
    maximize: boolean;
  }): DiceTermResult {
    const roll = super.roll(options);
    return roll;
  }

  public get resultValues(): string[] {
    return this.results.map((result) => {
      return this.getResultLabel(result);
    });
  }
}
