// types/index.ts
export type Property = {
    id: number
    title: string
    location: string
    description: string
    image: string
    pricePerNight: number
    beds: number
    baths: number
    rating: number
  }

import { User } from "next-auth";

export interface IUser extends User {
  id: string;
  email: string;
  name?: string;
  password?: string;
}