import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/Layout";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Panchhi" }] }),
  component: Login,
});

function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, pw);
    toast.success("Welcome back!");
    nav({ to: "/account" });
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-md px-6 py-16 md:py-24">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Welcome Back</div>
          <h1 className="mt-2 font-serif text-4xl">Login to Panchhi</h1>
        </div>
        <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-7 shadow-soft">
          <Field label="Email"><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inp} placeholder="you@email.com" /></Field>
          <Field label="Password"><input required type="password" value={pw} onChange={(e) => setPw(e.target.value)} className={inp} placeholder="••••••••" /></Field>
          <button className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]">Sign In</button>
          <p className="text-center text-xs text-muted-foreground">New here? <Link to="/signup" className="text-primary">Create an account</Link></p>
        </form>
      </div>
    </PageShell>
  );
}

const inp = "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span><div className="mt-1">{children}</div></label>;
}
