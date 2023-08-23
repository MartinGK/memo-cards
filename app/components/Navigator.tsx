import { FaPlus } from "react-icons/fa";
import { VscDebugStart } from "react-icons/vsc";
import { GoChecklist } from "react-icons/go";
import { TbListSearch } from "react-icons/tb";
import { Routes } from "../utils/routes";
import { styled } from "styled-components";
import Link from "next/link";

const StyledNav = styled.nav`
  ul {
    display: flex;
    color: black;
    color: white;
    align-self: center;
    font-size: 2rem;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      padding-left: 2rem;
      a {
        color: black;
      }
    }
  }
`;

export default function Navigator() {
  return (
    <StyledNav aria-label="navigator" role="navigator">
      <ul>
        <li>
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
    </StyledNav>
  );
}
