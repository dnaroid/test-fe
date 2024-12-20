import {Review} from "@/config/models"

export const API_URL = process.env.NEXT_PUBLIC_API_URL || (() => { throw new Error("NEXT_PUBLIC_API_URL is not set")})()

export const RATINGS_OPTIONS = ["1", "2", "3", "4", "5"]
export const INPUT_DEBOUNCE_MS = 300
export const PAGINATION = 10

export const EMPTY_REVIEW = {
  author: "",
  title: "",
  content: "",
  rating: 5,
} as Review
