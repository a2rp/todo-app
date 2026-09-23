import { useEffect, useState } from "react";
import { TbArrowUp } from "react-icons/tb";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 280);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`backToTop${visible ? " backToTopVisible" : ""}`}
      type="button"
      aria-label="Go to top"
      title="Go to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <TbArrowUp aria-hidden="true" />
    </button>
  );
}

export default BackToTop;
