import { BandScoreItemProps } from "./BandScoreItem";

export type BandLevelOptions =
  | "green"
  | "yellow"
  | "red"
  | "blue"
  | "gray"
  | "dark-gray";

export const LEVELS: BandScoreItemProps[] = [
  {
    title: "Level",
    value: "Band",
    color: "dark-gray",
  },
  {
    title: "Expert",
    value: 9,
    color: "green",
  },
  {
    title: "Very Good",
    value: 8.5,
    color: "green",
  },
  {
    title: "Very Good",
    value: 8,
    color: "green",
  },
  {
    title: "Good",
    value: 7.5,
    color: "yellow",
  },
  {
    title: "Good",
    value: 7,
    color: "yellow",
  },
  {
    title: "Competent",
    value: 6.5,
    color: "red",
  },
  {
    title: "Competent",
    value: 6,
    color: "red",
  },
  {
    title: "Modest",
    value: 5.5,
    color: "blue",
  },
  {
    title: "Modest",
    value: 5,
    color: "blue",
  },
  {
    title: "Limited",
    value: 4.5,
    color: "gray",
  },
  {
    title: "Limited",
    value: 4,
    color: "gray",
  },
  {
    title: "Extremely Limited",
    value: 3.5,
    color: "gray",
  },
];
