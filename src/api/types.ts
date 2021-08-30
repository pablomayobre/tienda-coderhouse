export interface ItemData {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly basePrice: number;
  readonly discount?: number;
  readonly pictureURL: string;
}

export type VariantType = "dropdown" | "color"

type Value<
  Type extends VariantType,
> = {
  readonly default?: boolean,
  readonly name: string;
  readonly color: Type extends "color" ? string : undefined;
  readonly extraPrice?: number;
};

type WithVariantsOrStock<T> = (T & {
  readonly variants: Variant<VariantType>
})| (T & {
  readonly stock: number
})

type Variant<
  Type extends VariantType,
> = {
  readonly values: ReadonlyArray<WithVariantsOrStock<Value<VariantType>>>;
  readonly name: string;
  readonly type: Type;
}

interface FullItem extends ItemData {
  readonly categories?: ReadonlyArray<string>;
  readonly display?: boolean;
}

export type FullItemData = WithVariantsOrStock<FullItem>
