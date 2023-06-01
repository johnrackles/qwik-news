export type Story = {
  by: string;
  descendants: number;
  id: number;
  kids?: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
  text?: string;
};

export type AlgoliaItem = {
  id: number;
  created_at: string;
  author: string;
  title?: string;
  url: string;
  points: number;
  parten_id: number | null;
  text: string;
  children: AlgoliaItem[] | [];
};
