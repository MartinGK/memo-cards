"use client";
import Link from "next/link";
import { Routes } from "../utils/routes";
import ComicButton from "./ComicButton";

export const NOTHING_MORE_TO_LEARN_MESSAGE = "Nothing more to learn!";

const NothingMoreToLearn = () => {

  return (
    <div className="flex justify-center flex-col items-center">
      <p role="message" aria-label="nothing-more-to-learn-message" className="text-4xl mb-10 font-bold">
        {NOTHING_MORE_TO_LEARN_MESSAGE}
      </p>
      <Link href={Routes.ADD} aria-label="add a new card anchor">
        <ComicButton aria-label="add a new card" >Add a new card!</ComicButton>
      </Link>
    </div>
  );
};

export default NothingMoreToLearn;
