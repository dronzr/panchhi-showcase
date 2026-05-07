import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/Layout";
import { CheckCircle2, Calendar } from "lucide-react";
import store from "@/assets/store.jpg";

export const Route = createFileRoute("/book")({
  head: () => ({ meta: [
    { title: "Book Appointment — Panchhi" },
    { name: "description", content: "Book your trial appointment at our Indore boutique." },
  ]}),
  component: Book,
});

function Book() {
  const [done, setDone] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const slots = ["12:00 PM","1:30 PM","3:00 PM","4:30 PM","6:00 PM","7:30 PM"];
  const today = new Date().toISOString().split("T")[0];

  return (
    <PageShell>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 md:px-8">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Personal Styling</div>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl">Book An Appointment</h1>
          <p className="mt-3 text-muted-foreground">Schedule your visit to our boutique for a private trial & styling session.</p>

          {done ? (
            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
              <h2 className="mt-4 font-serif text-2xl">Appointment Confirmed!</h2>
              <p className="mt-2 text-sm text-muted-foreground">{date} · {time}</p>
              <p className="mt-1 text-sm text-muted-foreground">We'll send a WhatsApp confirmation shortly.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mt-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name"><input required className={inp} placeholder="Your full name" /></Field>
                <Field label="Phone"><input required type="tel" className={inp} placeholder="WhatsApp number" /></Field>
              </div>
              <Field label="Email"><input type="email" className={inp} placeholder="you@email.com" /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Preferred Date">
                  <input required type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className={inp} />
                </Field>
                <Field label="Preferred Time">
                  <select required value={time} onChange={(e) => setTime(e.target.value)} className={inp}>
                    <option value="">Select time</option>
                    {slots.map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Notes (optional)">
                <textarea rows={3} className={inp} placeholder="Any specific outfit, occasion or preferences?" />
              </Field>
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground shadow-luxury hover:scale-[1.01] transition-transform">
                <Calendar className="h-4 w-4" /> Confirm Appointment
              </button>
              <p className="text-center text-xs text-muted-foreground">You'll receive confirmation on WhatsApp.</p>
            </form>
          )}
        </div>

        <div className="relative hidden md:block">
          <div className="sticky top-24 overflow-hidden rounded-2xl shadow-luxury">
            <img src={store} alt="Panchhi boutique" className="aspect-[4/5] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--maroon-deep)]/80 to-transparent p-6 text-primary-foreground">
              <div className="text-xs uppercase tracking-wider opacity-80">Visit Us</div>
              <div className="mt-1 font-serif text-2xl">Panchhi Boutique, Indore</div>
              <div className="mt-1 text-sm opacity-80">Magnet Tower, M101, New Palasia · Mon–Sat 12–8:30PM, Sun 2–8:30PM</div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

const inp = "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span><div className="mt-1">{children}</div></label>;
}
