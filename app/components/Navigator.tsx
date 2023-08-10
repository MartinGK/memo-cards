'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { VscDebugStart } from "react-icons/vsc";
import { GoChecklist } from "react-icons/go";
import { TbListSearch } from "react-icons/tb";
import { Routes } from "../utils/routes";

export default function Navigator() {
  const { push } = useRouter();

  const redirect = (to: Routes) => {
    push(to);
  };

  return (
    <nav aria-label="navigator" role="navigator">
      <ul>
        <li>
          <button onClick={() => redirect(Routes.ADD)} aria-label="add a word">
            <FaPlus />
          </button>
        </li>
        <li>
          <button
            onClick={() => redirect(Routes.LEARN)}
            aria-label="start learning"
          >
            <VscDebugStart />
          </button>
        </li>
        <li>
          <button
            onClick={() => redirect(Routes.LEARNED_WORDS)}
            aria-label="shows the learned words"
          >
            <GoChecklist />
          </button>
        </li>
        <li>
          <button
            onClick={() => redirect(Routes.WORDS_TO_LEARN)}
            aria-label="shows the words to learn"
          >
            <TbListSearch />
          </button>
        </li>
      </ul>
    </nav>
  );
}
