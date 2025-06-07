"use client";
import { useState, useRef } from "react";

import styles from "./Header.module.css";
export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const windowWidthBreakpoint = 768;

  const handleSearchClick = () => {};
  return (
    <header>
      <nav className={styles.HeaderNavigation}>
        <button className={styles.HomeButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={styles.HomeIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </button>
        <form>
          <div
            className={`${styles.SearchBar} ${expanded ? styles.expanded : ""}`}
          >
            <button className={styles.SearchSubmit} onClick={handleSearchClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={styles.SearchIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
            <input
              className={styles.SearchInput}
              placeholder="What would you like to play?"
            ></input>
          </div>
        </form>

        <button className={styles.LoginButton}>Log in</button>
      </nav>
    </header>
  );
}
