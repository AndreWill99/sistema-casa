import logo from "../assets/logo.png";

// AJUSTE: link da área de gestão (login do CRM)
const CRM_URL = import.meta.env.VITE_CRM_URL ?? "#";

const links = [
  { label: "Quem somos", href: "#sobre" },
  { label: "Estrutura", href: "#estrutura" },
  { label: "Gestão", href: CRM_URL },
];

export default function Footer() {
  return (
    <footer className="bg-vinho py-10 text-center text-creme">
      <img src={logo} alt="Logo" className="mx-auto h-16 w-auto" />

      <ul className="mt-6 space-y-2 text-xs">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="underline underline-offset-2 hover:opacity-80">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
