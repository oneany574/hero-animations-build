import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ActionLink, IconButton } from "@/components/ui/action";

const companyLinks = ["Newsroom", "Careers", "Legal Information"];
const trustLinks = ["LLM-Optimized", "Security", "Governance"];

function Wordmark() {
  return (
    <a href="#top" className="font-display text-[39px] leading-none text-accent" aria-label="Jasper home">
      jasper
    </a>
  );
}

function MenuRow({ children }: { children: string }) {
  return (
    <a href={`#${children.toLowerCase().replaceAll(" ", "-")}`} className="group flex h-[58px] items-center justify-between px-4 text-[17px] font-medium text-foreground transition-colors hover:bg-menu-hover">
      {children}
      <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </a>
  );
}

function CompanyMegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="mega-menu absolute left-1/2 top-[94px] z-50 grid w-[min(1240px,calc(100vw-64px))] -translate-x-1/2 grid-cols-[0.94fr_1fr_1fr] bg-menu p-7 text-foreground shadow-2xl" role="dialog" aria-label="Company menu">
      <article className="overflow-hidden bg-company-blue text-primary-foreground">
        <div className="p-6 pb-7">
          <h2 className="font-display text-[40px] leading-none">About Jasper</h2>
          <p className="mt-4 text-[17px] font-semibold">Our vision, mission, and impact.</p>
          <a href="#about" onClick={onClose} className="mt-5 inline-flex items-center gap-3 text-[16px] font-semibold text-accent">Learn More <span aria-hidden="true">→</span></a>
        </div>
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=85" alt="A diverse creative team gathered together" className="h-[252px] w-full object-cover" />
      </article>

      <section className="px-7 pt-4">
        <h2 className="font-display text-[30px] leading-none">Company Information</h2>
        <p className="mt-4 max-w-[300px] text-[16px] leading-5 text-muted-foreground">Get the latest about Jasper in the news, careers information, legal documents and more.</p>
        <nav className="mt-7" aria-label="Company information">{companyLinks.map((link) => <MenuRow key={link}>{link}</MenuRow>)}</nav>
      </section>

      <section className="border-l border-border px-10 pt-4">
        <a href="#trust" className="flex items-center justify-between font-display text-[30px] leading-none">Trust Foundation <ChevronRight className="size-4" /></a>
        <p className="mt-4 max-w-[310px] text-[16px] leading-5 text-muted-foreground">Learn more about our LLM-optimized infrastructure with built-in security, governance, and compliance.</p>
        <nav className="mt-7" aria-label="Trust foundation">{trustLinks.map((link) => <MenuRow key={link}>{link}</MenuRow>)}</nav>
      </section>
    </div>
  );
}

export function Header() {
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const openTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const openCompany = () => { if (closeTimer.current) clearTimeout(closeTimer.current); openTimer.current = setTimeout(() => setCompanyOpen(true), 120); };
  const keepCompanyOpen = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setCompanyOpen(true); };
  const delayedClose = () => { if (openTimer.current) clearTimeout(openTimer.current); closeTimer.current = setTimeout(() => setCompanyOpen(false), 120); };
  const toggleCompany = () => { if (openTimer.current) clearTimeout(openTimer.current); setCompanyOpen((open) => !open); };

  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setCompanyOpen(false); setMobileOpen(false); } };
    document.addEventListener("keydown", escape);
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.removeEventListener("keydown", escape); document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-[60] h-20 bg-menu">
        <div className="grid h-full grid-cols-[1fr_auto] items-center px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-10">
          <Wordmark />
          <nav className="hidden items-center gap-9 text-[16px] font-medium lg:flex" aria-label="Main navigation">
            {['Platform', 'Solutions', 'Resources'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="transition-colors hover:text-accent">{item}</a>)}
            <button onMouseEnter={openCompany} onMouseLeave={delayedClose} onFocus={keepCompanyOpen} onClick={toggleCompany} aria-expanded={companyOpen} aria-haspopup="dialog" className="flex items-center gap-1 transition-colors hover:text-accent">Company <ChevronDown className={`size-3.5 transition-transform ${companyOpen ? "rotate-180" : ""}`} /></button>
            <a href="#pricing" className="transition-colors hover:text-accent">Pricing</a>
          </nav>
          <div className="hidden items-center justify-end gap-6 text-[16px] font-medium lg:flex">
            <a href="#login" className="transition-colors hover:text-accent">Log In</a>
            <a href="#trial" className="transition-colors hover:text-accent">Free Trial</a>
            <ActionLink href="#demo" className="h-[50px] px-7">Get A Demo</ActionLink>
          </div>
          <IconButton className="lg:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>{mobileOpen ? <X /> : <Menu />}</IconButton>
        </div>
        {companyOpen && <div onMouseEnter={keepCompanyOpen} onMouseLeave={delayedClose}><CompanyMegaMenu onClose={() => setCompanyOpen(false)} /></div>}
      </header>

      {companyOpen && <button aria-label="Close company menu" className="fixed inset-x-0 bottom-0 top-20 z-40 cursor-default bg-overlay" onClick={() => setCompanyOpen(false)} />}

      {mobileOpen && (
        <nav className="fixed inset-x-0 bottom-0 top-20 z-50 overflow-y-auto bg-menu px-6 py-6 lg:hidden" aria-label="Mobile navigation">
          {['Platform', 'Solutions', 'Resources'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="block border-b border-border py-5 text-xl font-semibold">{item}</a>)}
          <button onClick={() => setMobileCompanyOpen((open) => !open)} className="flex w-full items-center justify-between border-b border-border py-5 text-xl font-semibold" aria-expanded={mobileCompanyOpen}>Company <ChevronDown className={`size-5 transition-transform ${mobileCompanyOpen ? "rotate-180" : ""}`} /></button>
          {mobileCompanyOpen && <div className="border-b border-border bg-secondary px-4 py-2">{[...companyLinks, ...trustLinks].map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} onClick={() => setMobileOpen(false)} className="block py-3.5 text-base">{item}</a>)}</div>}
          <a href="#pricing" onClick={() => setMobileOpen(false)} className="block border-b border-border py-5 text-xl font-semibold">Pricing</a>
          <div className="mt-8 grid gap-3"><ActionLink href="#trial" variant="outline">Start Free Trial</ActionLink><ActionLink href="#demo">Get A Demo</ActionLink></div>
        </nav>
      )}
    </>
  );
}