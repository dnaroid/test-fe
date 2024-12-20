export interface Review {
  id: number;
  title: string;
  content: string;
  rating: number;  // 1 to 5
  author: string;
  createdAt: string; // ISO date
}

export type SearchParams = {
  take: string
  skip: string
  author?: string
  rating?: string
  title?: string
}
