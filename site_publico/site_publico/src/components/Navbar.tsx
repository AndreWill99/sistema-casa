import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/20 bg-pessego/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#inicio" aria-label="Início">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </a>

        <ul className="flex items-center gap-6 text-sm font-medium text-black">
          <li>
            <a href="#sobre" className="underline underline-offset-2 hover:text-vinho">
              Quem somos
            </a>
          </li>
          <li>
            <a href="#contato" className="underline underline-offset-2 hover:text-vinho">
              Contato
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
