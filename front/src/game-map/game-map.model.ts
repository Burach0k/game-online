interface ITileConfig {
  isBarrier: boolean;
  tileX: number;
  tileY: number;
}

export interface IMapConfig {
  land: ITileConfig[][];
  tileSize: number;
}

export const screenTileSize = 50;
export const tileBoxCoefficient = 0.8;

export enum DayPeriods {
  Day = 'Day',
  Night = 'Night',
}

export enum ColorOfDayPeriods {
  Day = 'green',
  Night = 'black',
}
