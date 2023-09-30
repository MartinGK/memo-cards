import { FaPlus } from "react-icons/fa";
import { VscDebugStart } from "react-icons/vsc";
import { GoChecklist } from "react-icons/go";
import { TbListSearch } from "react-icons/tb";
import { Routes } from "../utils/routes";
import Link from "next/link";

export default function Navigator() {
  return (
    <nav aria-label="navigator" role="navigator">
      <ul className="flex text-white self-center text-3xl list-none p-0 m-0">
        <li className="pl-[2rem] text-black">
          <Link href={Routes.ADD} as={Routes.ADD} aria-label="link to add a card">
            <FaPlus />
          </Link>
        </li>
        <li>
          <Link href={Routes.LEARN} as={Routes.LEARN} aria-label="link to start learn">
            <VscDebugStart />
          </Link>
        </li>
        <li>
          <Link href={Routes.LEARNED} as={Routes.LEARNED} aria-label="link to the learned list">
            <GoChecklist />
          </Link>
        </li>
        <li>
          <Link href={Routes.TO_LEARN} as={Routes.TO_LEARN} aria-label="link to the learning list">
            <TbListSearch />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
