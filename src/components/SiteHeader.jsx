import { useEffect, useRef, useState } from "react";
import { TbChecklist, TbMenu2, TbX } from "react-icons/tb";

const logoPath = `${process.env.PUBLIC_URL || ""}/logo.png`;

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollPosition = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;

      if (currentPosition <= 8) {
        setHidden(false);
      } else {
        setHidden(currentPosition > lastScrollPosition.current);
      }

      lastScrollPosition.current = currentPosition;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`siteHeader${hidden ? " siteHeaderHidden" : ""}`}>
      <div className="headerInner">
        <a className="brand" href="#todo-list" onClick={closeMenu}>
          <img src={logoPath} alt="Todo App logo" />
          <span>
            <strong>Todo App</strong>
            <small>Plan your day clearly</small>
          </span>
        </a>

        <nav className="desktopNav" aria-label="Primary navigation">
          <a href="#todo-list">Tasks</a>
          <a href="#about">About</a>
        </nav>

        <button
          className="menuButton"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <TbX aria-hidden="true" /> : <TbMenu2 aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="mobileNav" aria-label="Mobile navigation">
          <a href="#todo-list" onClick={closeMenu}>Tasks</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <span className="mobileNavHint"><TbChecklist aria-hidden="true" /> Stay on top of your day</span>
        </nav>
      )}
    </header>
  );
}

export default SiteHeader;
