import React from "react";
import Navigator from "../components/Navigator";

export default function Header() {
  return (
    <header role="header" aria-label="header">
      <h1>Welcome</h1>
      <Navigator />
    </header>
  );
}
