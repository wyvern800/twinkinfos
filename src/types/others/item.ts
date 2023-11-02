export type AlternativeItem = {
  itemId: number;
  priority: number;
};

export type Item =
  | {
      mainItemId: number;
      alternatives: AlternativeItem[];
    }
  | undefined;
