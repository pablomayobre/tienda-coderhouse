export interface ItemData {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly discount?: number;
  readonly pictureURL: string;
}

export type VariantType = "dropdown" | "color"

export type Value<T> = {
  readonly displayName?: string;
  readonly color: T extends "color" ? string : unknown;
};

export interface Variants<T extends VariantType> {
  readonly type: T;
  readonly displayName?: string;
  readonly default: number;
  readonly values: Readonly<Record<string, Value<T>>>
}

type GenericVariant = Variants<"color"> | Variants<"dropdown">

export interface FullItem extends ItemData {
  readonly categories?: ReadonlyArray<string>;
  readonly display?: boolean;
  readonly stock: number;
  variants?: Readonly<Record<string, GenericVariant>>
}
