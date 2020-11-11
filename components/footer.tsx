import FooterLink from "./footerLink";

export default function Footer() {
  return (
    <div className="bg-dark w-full ">
      <div className="container pt-8 pb-16">
        <div className="container text-foreground flex flex-col flex-no-wrap lg:justify-between lg:flex-row mx-auto w-11/12 md:w-10/12 lg:w-9/12">
          <div className="mx-auto lg:mx-0">
            <FooterLink href="https://blog.ranegillian.me/" text="blog.ranegillian.me" />
            &nbsp;&copy;&nbsp;2020
          </div>
          <div className="mx-auto lg:mx-0">
            Created and Powered by&nbsp;
            <FooterLink href="https://nextjs.org/" text="Next.JS" />
            &nbsp;and&nbsp;
            <FooterLink href="https://strapi.io/" text="Strapi" />
          </div>
          <div className="mx-auto lg:mx-0">
            <FooterLink href="https://www.ranegillian.me/" text="Website" />
            &nbsp;&bull;&nbsp;
            <FooterLink
              href="https://www.linkedin.com/in/ranegv/"
              text="LinkedIn"
            />
            &nbsp;&bull;&nbsp;
            <FooterLink
              href="https://github.com/rgvillanueva28"
              text="GitHub"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
