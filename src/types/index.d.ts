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

export type Comment = {
  author: string;
  id: number;
  created_at: string;
  type: "comment";
  text: string;
  children?: Comment[];
};
