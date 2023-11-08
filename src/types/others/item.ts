export type AlternativeItem = {
  hordeItemId: number;
  allianceItemId: number;
  priority: number;
};

export type Item =
  | {
      hordeMainItemId: number;
      allianceMainItemId: number;
      alternatives: AlternativeItem[];
    }
  | undefined;
