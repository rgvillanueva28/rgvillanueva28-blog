interface footerLinkProps {
  href: string;
  text: string;
}

export default function FooterLink({ href, text }: footerLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener norefferer"
      className="hover:text-accent-mid hover:underline"
    >
      {text}
    </a>
  );
}
