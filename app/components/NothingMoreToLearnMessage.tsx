import Link from "next/link";
import { Routes } from "../utils/routes";

export const NOTHING_MORE_TO_LEARN_MESSAGE = "Nothing more to learn!";

export default function NothingMoreToLearn({}) {
  return (
    <div>
      <p role="message" aria-label="nothing-more-to-learn-message">
        {NOTHING_MORE_TO_LEARN_MESSAGE}
      </p>
      <Link href={Routes.ADD} aria-label="add a new card anchor">
        <button aria-label="add a new card">Add a new card!</button>
      </Link>
    </div>
  );
}
