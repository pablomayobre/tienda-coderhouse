export type ItemData = {
  id: string;
  title: string;
  description: string;
  price: number;
  pictureURL: string;
};

export type FullItemData = ItemData & {
  categories: string[]
}