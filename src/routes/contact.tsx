import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/Layout";
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Panchhi" },
    { name: "description", content: "Visit, call or message Panchhi By Abha Collection in Indore." },
  ]}),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:px-8">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Get In Touch</div>
          <h1 className="mt-2 font-serif text-5xl">We'd love to hear from you</h1>
          <p className="mt-3 text-muted-foreground">Questions, custom orders, collaborations — drop us a line.</p>

          <div className="mt-8 space-y-5 text-sm">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary"><MapPin className="h-5 w-5" /></div>
              <div><div className="font-medium">Address</div><div className="text-muted-foreground">Opposite To Zari Showroom, New Palasia, Indore - 452001</div></div>
            </div>
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary"><Phone className="h-5 w-5" /></div>
              <div><div className="font-medium">Call / WhatsApp</div><div className="text-muted-foreground">+91 12345 67890</div></div>
            </div>
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary"><Mail className="h-5 w-5" /></div>
              <div><div className="font-medium">Email</div><div className="text-muted-foreground">hello@panchhi.in</div></div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <a className="rounded-full border border-border p-2.5 hover:bg-secondary"><Instagram className="h-4 w-4" /></a>
            <a className="rounded-full border border-border p-2.5 hover:bg-secondary"><Facebook className="h-4 w-4" /></a>
            <a href="https://wa.me/911234567890" target="_blank" rel="noreferrer" className="rounded-full border border-border p-2.5 hover:bg-secondary"><MessageCircle className="h-4 w-4" /></a>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.6!2d75.88!3d22.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQzJzEyLjAiTiA3NcKwNTInNDguMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%" height="280" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="h-fit rounded-2xl border border-border bg-card p-7 shadow-soft md:sticky md:top-24">
          {sent ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
              <h3 className="mt-4 font-serif text-2xl">Message sent!</h3>
              <p className="mt-2 text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <h2 className="font-serif text-2xl">Send Us A Message</h2>
              <div className="mt-5 space-y-4">
                <Field label="Your Name"><input required className={inp} /></Field>
                <Field label="Phone"><input required type="tel" className={inp} /></Field>
                <Field label="Email"><input type="email" className={inp} /></Field>
                <Field label="Your Message"><textarea required rows={4} className={inp} /></Field>
                <button className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground">Send Message</button>
              </div>
            </>
          )}
        </form>
      </section>
    </PageShell>
  );
}

const inp = "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span><div className="mt-1">{children}</div></label>;
}
