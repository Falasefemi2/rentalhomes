import { createFileRoute, Link } from "@tanstack/react-router";
import { authApi } from "#/lib/api";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { PasswordInput } from "#/components/ui/password-input";
import { Label } from "#/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import * as React from "react";

export const Route = createFileRoute("/auth/reset")({ component: Reset });

function Reset() {
  const [token, setToken] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [msg, setMsg] = React.useState<string | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("token");
    if (t) setToken(t);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setErr(null); setMsg(null);
    try {
      await authApi.reset(token.trim(), password);
      setMsg("Password reset — you can now sign in.");
    } catch (e) { setErr((e as Error).message); } finally { setLoading(false); }
  };

  return (
    <div className="mx-auto max-w-[440px] px-4 py-16 sm:px-6">
      <Card>
        <CardHeader><CardTitle>Reset password</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-3">
            <Label>Reset token</Label><Input required value={token} onChange={(e) => setToken(e.target.value)} placeholder="paste token from email/logs" />
            <Label>New password (min 8)</Label><PasswordInput required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
            {msg ? <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{msg} <Link to="/auth/signin" className="font-semibold underline">Sign in</Link></p> : null}
            {err ? <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{err}</p> : null}
            <Button type="submit" disabled={loading} className="w-full">{loading ? "Resetting…" : "Reset password"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
