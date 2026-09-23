import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const copyright =
    year === 2026 ? "2026" : `2026 - ${year}`;

  return (
    <footer className="bg-surface text-text-secondary px-24 py-6 flex-0 flex justify-between border-t border-border">
      <div>
        © {copyright} Ivesome
      </div>
      <div className="flex gap-4">
        <Link to="/" className="hover:text-text-primary">{t("shared.footer.privacyPolicy")}</Link>
        <Link to="/" className="hover:text-text-primary">{t("shared.footer.terms")}</Link>
      </div>
    </footer>
  );
}

export default Footer;
