import Navigator from "./Navigator";

export default function Header() {
  return (
    <header className="flex flex-col items-center" role="header" aria-label="header">
      <h1>Welcome!</h1>
      <Navigator />
    </header>
  );
}
