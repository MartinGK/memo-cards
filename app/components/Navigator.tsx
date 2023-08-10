"use client";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { VscDebugStart } from "react-icons/vsc";
import { GoChecklist } from "react-icons/go";
import { TbListSearch } from "react-icons/tb";
import { Routes } from "../utils/routes";
import Link from "next/link";

export default function Navigator() {

  return (
    <nav aria-label="navigator" role="navigator">
      <ul>
        <Link href={Routes.ADD} aria-label="link to add a card">
          <li>
            <FaPlus />
          </li>
        </Link>
        <li>
          <Link
            href={Routes.LEARN}
            aria-label="link to start learn"
          >
            <VscDebugStart />
          </Link>
        </li>
        <li>
          <Link
            href={Routes.LEARNED}
            aria-label="link to the learned list"
          >
            <GoChecklist />
          </Link>
        </li>
        <li>
          <Link
            href={Routes.TO_LEARN}
            aria-label= "link to the learning list"
          >
            <TbListSearch />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
