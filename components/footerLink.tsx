interface footerLinkProps {
  href: string;
  text: string;
  className: string;
}

export default function FooterLink({ href, text, className }: footerLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener norefferer"
      className={"hover:text-accent-mid hover:underline " + className}
    >
      {text}
    </a>
  );
}
