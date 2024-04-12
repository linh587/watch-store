export interface Rating {
  productId: string;
  userAccountId: string;
  star: number;
  content: string;
  status?: RatingStatus;
  createdAt: Date | string;
  updatedAt?: Date | string;
  userName: string;
  userAvatar: string;
}

export type RatingStatus = "lock" | "unavailable";

export interface CreateRating {
  productId: string;
  star: number;
  content: string;
}
