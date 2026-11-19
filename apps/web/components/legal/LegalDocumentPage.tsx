import Link from "next/link";
import type { LegalBlock, LegalDocument } from "@/content/legal/legal.config";
import { interpolateLegalText } from "@/content/legal/legal.config";
import privacy from "@/content/legal/privacy";
import terms from "@/content/legal/terms";
import dataDeletion from "@/content/legal/data-deletion";

const documents = { privacy, terms, "data-deletion": dataDeletion } satisfies Record<LegalDocument["id"], LegalDocument>;

function LegalBlockView({ block }: { block: LegalBlock }) {
  if (block.type === "paragraph") {
    return <p className="hv-body-lg text-pretty leading-8">{interpolateLegalText(block.text)}</p>;
  }

  if (block.type === "bullets" || block.type === "steps") {
    const List = block.type === "steps" ? "ol" : "ul";
    return (
      <List className={`${block.type === "steps" ? "list-decimal" : "list-disc"} space-y-3 ps-6 leading-8 marker:text-[var(--accent)]`}>
        {block.items.map((item) => <li className="ps-1" key={item}>{interpolateLegalText(item)}</li>)}
      </List>
    );
  }

  if (block.type === "definitions") {
    return (
      <dl className="space-y-5">
        {block.items.map((item) => (
          <div className="border-s-2 border-[var(--border-light)] ps-5" key={item.term}>
            <dt className="font-subheading font-semibold text-[var(--primary-dark)]">{item.term}</dt>
            <dd className="hv-body-lg mt-1 leading-8">{interpolateLegalText(item.description)}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return <p><Link className="font-semibold text-[var(--primary-dark)] underline decoration-[var(--accent)] decoration-2 underline-offset-4 hover:decoration-[var(--primary)] focus-visible:rounded-sm" href={block.href}>{block.text}</Link></p>;
}

function DocumentLinks({ current }: { current: LegalDocument["id"] }) {
  const links = [
    { id: "privacy", href: "/privacy", label: "Privacy Policy" },
    { id: "terms", href: "/terms", label: "Terms of Service" },
    { id: "data-deletion", href: "/data-deletion", label: "Account and Data Deletion" },
  ] as const;

  return (
    <nav aria-label="Other legal documents" className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm">
      {links.filter((link) => link.id !== current).map((link) => (
        <Link className="font-semibold text-[var(--primary-dark)] underline decoration-[var(--border-light)] underline-offset-4 hover:decoration-[var(--accent)] focus-visible:rounded-sm" href={link.href} key={link.id}>{link.label}</Link>
      ))}
    </nav>
  );
}

export default function LegalDocumentPage({ documentId }: { documentId: LegalDocument["id"] }) {
  const document = documents[documentId];

  return (
    <main className="hv-section min-w-0 bg-[var(--background)] text-[var(--text-dark)]">
      <div className="hv-container" id="top">
        <header className="mx-auto max-w-4xl pb-10">
          <p className="hv-tagline-soft mb-4">Legal</p>
          <h1 className="hv-h1 font-heading text-[var(--primary-dark)]">{document.title}</h1>
          <p className="hv-body-lg mt-5 max-w-3xl text-pretty">{document.summary}</p>
          <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">Last updated: {document.lastUpdated}</p>
          <DocumentLinks current={document.id} />
        </header>

        <div className="mx-auto grid min-w-0 max-w-6xl gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          <details className="rounded-[var(--radius-card)] border border-[var(--border-light)] bg-[var(--surface)] px-5 py-4 lg:hidden">
            <summary className="cursor-pointer font-subheading font-semibold text-[var(--primary-dark)] focus-visible:rounded-sm">On this page</summary>
            <nav aria-label="Table of contents" className="pt-4">
              <ol className="space-y-2 border-s border-[var(--border-light)] ps-4 text-sm leading-6">
                {document.sections.map((section, index) => <li key={section.id}><a className="text-[var(--text-dark)] underline decoration-[var(--border-light)] underline-offset-2 hover:decoration-[var(--accent)] focus-visible:rounded-sm" href={`#${section.id}`}>{index + 1}. {section.heading}</a></li>)}
              </ol>
            </nav>
          </details>

          <aside className="hidden min-w-0 lg:block">
            <nav aria-label="Table of contents" className="sticky top-28 rounded-[var(--radius-card)] border border-[var(--border-light)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]">
              <h2 className="font-subheading text-base font-semibold text-[var(--primary-dark)]">On this page</h2>
              <ol className="mt-4 space-y-2 border-s border-[var(--border-light)] ps-4 text-sm leading-6">
                {document.sections.map((section, index) => <li key={section.id}><a className="text-[var(--text-dark)] underline decoration-[var(--border-light)] underline-offset-2 hover:decoration-[var(--accent)] focus-visible:rounded-sm" href={`#${section.id}`}>{index + 1}. {section.heading}</a></li>)}
              </ol>
            </nav>
          </aside>

          <article lang="en" dir="ltr" className="min-w-0 max-w-3xl space-y-10">
            {document.sections.map((section, index) => (
              <section aria-labelledby={`${section.id}-heading`} className="scroll-mt-32 border-b border-[var(--border-light)] pb-9 last:border-b-0" id={section.id} key={section.id}>
                <p className="hv-tagline-soft mb-3">{index + 1}.</p>
                <h2 className="hv-h2 font-heading text-[var(--primary-dark)]" id={`${section.id}-heading`}>{section.heading}</h2>
                <div className="mt-5 space-y-5 break-words [overflow-wrap:anywhere]">
                  {section.blocks.map((block, blockIndex) => <LegalBlockView block={block} key={`${section.id}-${block.type}-${blockIndex}`} />)}
                </div>
              </section>
            ))}

            <section aria-labelledby="legal-questions-heading" className="rounded-[var(--radius-card)] border border-[var(--border-light)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] sm:p-8">
              <h2 className="hv-h2 font-heading text-[var(--primary-dark)]" id="legal-questions-heading">Questions?</h2>
              <p className="hv-body mt-3">Contact our support team if you need help with this document or your account.</p>
              <a className="mt-4 inline-flex min-h-11 items-center rounded-lg border border-[var(--border-light)] px-4 py-2 font-subheading font-semibold text-[var(--primary-dark)] underline decoration-[var(--accent)] underline-offset-4 hover:bg-[var(--background)] focus-visible:rounded-lg" href="mailto:support@hudaverse.com">support@hudaverse.com</a>
            </section>

            <p className="pb-2 text-end text-sm"><a className="font-semibold text-[var(--primary-dark)] underline decoration-[var(--border-light)] underline-offset-4 hover:decoration-[var(--accent)] focus-visible:rounded-sm" href="#top">Back to top</a></p>
          </article>
        </div>
      </div>
    </main>
  );
}
