import React from "react";
import {
  TbBrandCodepen,
  TbBrandFacebook,
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandPatreon,
  TbBrandYoutube,
  TbCoffee,
  TbHeartHandshake,
  TbMail,
  TbWorld,
} from "react-icons/tb";

const footerLinks = [
  ["Portfolio", "https://www.ashishranjan.net/", TbWorld],
  ["GitHub", "https://github.com/a2rp", TbBrandGithub],
  ["CodePen", "https://codepen.io/ash1198", TbBrandCodepen],
  ["LinkedIn", "https://www.linkedin.com/in/aashishranjan", TbBrandLinkedin],
  ["Facebook", "https://www.facebook.com/theash.ashish/", TbBrandFacebook],
  ["YouTube", "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", TbBrandYoutube],
  ["Email", "mailto:ash.ranjan09@gmail.com", TbMail],
  ["Support", "https://a2rp-donation-page.netlify.app/", TbHeartHandshake],
  ["Buy Me a Coffee", "https://buymeacoffee.com/a2rp", TbCoffee],
  ["Patreon", "https://www.patreon.com/a2rp", TbBrandPatreon],
];

function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="siteFooter" id="about">
      <div className="footerInner">
        <div>
          <p className="footerTitle">Simple tasks, clearer days.</p>
          <p className="copyright">
            Copyright © {year}{" "}
            <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">
              Ashish Ranjan
            </a>
          </p>
        </div>

        <nav className="footerLinks" aria-label="Social and support links">
          {footerLinks.map(([label, href, Icon]) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            >
              {React.createElement(Icon, { "aria-hidden": true })}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default SiteFooter;
