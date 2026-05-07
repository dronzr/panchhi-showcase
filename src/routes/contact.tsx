import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/Layout";
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Panchhi" },
    { name: "description", content: "Visit, call or message Panchhi By Abha Collection in New Palasia, Indore." },
  ]}),
  component: Contact,
});

const hours = [
  ["Mon", "12:00 PM – 8:30 PM"],
  ["Tue", "12:00 PM – 8:30 PM"],
  ["Wed", "12:00 PM – 8:30 PM"],
  ["Thu", "12:00 PM – 8:30 PM"],
  ["Fri", "12:00 PM – 8:30 PM"],
  ["Sat", "12:00 PM – 8:30 PM"],
  ["Sun", "2:00 PM – 8:30 PM"],
];

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
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><MapPin className="h-5 w-5" /></div>
              <div>
                <div className="font-medium">Address</div>
                <div className="text-muted-foreground">Magnet Tower, M101, Race Course Road, Opposite to Zari Showroom, New Palasia, Indore – 452001, Madhya Pradesh</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Phone className="h-5 w-5" /></div>
              <div><div className="font-medium">Call / WhatsApp</div><div className="text-muted-foreground">+91 12345 67890</div></div>
            </div>
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Mail className="h-5 w-5" /></div>
              <div><div className="font-medium">Email</div><div className="text-muted-foreground">hello@panchhi.in</div></div>
            </div>
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Clock className="h-5 w-5" /></div>
              <div className="flex-1">
                <div className="font-medium">Store Hours</div>
                <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-muted-foreground">
                  {hours.map(([d, t]) => (<div key={d} className="contents"><span className="font-medium text-foreground">{d}</span><span>{t}</span></div>))}
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">GST Registered</span> · GSTIN: 23ABXFA8345E1Z7
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <a className="rounded-full border border-border p-2.5 hover:bg-secondary"><Instagram className="h-4 w-4" /></a>
            <a className="rounded-full border border-border p-2.5 hover:bg-secondary"><Facebook className="h-4 w-4" /></a>
            <a href="https://wa.me/911234567890" target="_blank" rel="noreferrer" className="rounded-full border border-border p-2.5 hover:bg-secondary"><MessageCircle className="h-4 w-4" /></a>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Panchhi Boutique location"
              src="https://www.google.com/maps?q=Magnet+Tower+New+Palasia+Indore&output=embed"
              width="100%" height="280" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Message sent!"); }} className="h-fit rounded-2xl border border-border bg-card p-7 shadow-soft md:sticky md:top-24">
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
