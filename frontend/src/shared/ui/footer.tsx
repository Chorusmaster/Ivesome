import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();
  const copyright =
    year === 2026 ? "2026" : `2026 - ${year}`;

  return (
    <footer className="bg-surface text-text-secondary px-24 py-6 flex-0 flex justify-between border-t border-border">
      <div>
        © {copyright} Ivesome
      </div>
      <div className="flex gap-4">
        <Link to="/" className="hover:text-text-primary">Privacy Policy</Link>
        <Link to="/" className="hover:text-text-primary">Terms and conditions</Link>
      </div>
    </footer>
  );
}

export default Footer;
