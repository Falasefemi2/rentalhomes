import { createFileRoute, Link } from "@tanstack/react-router";
import { authApi } from "#/lib/api";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import * as React from "react";

export const Route = createFileRoute("/auth/verify")({ component: Verify });

function Verify() {
  const search = Route.useSearch() as { token?: string };
  const [state, setState] = React.useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    const t = search.token || new URLSearchParams(window.location.search).get("token") || "";
    if (!t) return;
    setState("loading");
    authApi.verify(t).then(() => { setState("ok"); setMsg("Email verified. You can now sign in."); }).catch((e: Error) => { setState("error"); setMsg(e.message); });
  }, [search.token]);

  return (
    <div className="mx-auto max-w-[480px] px-4 py-16 sm:px-6">
      <Card>
        <CardHeader><CardTitle>Email verification</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {state === "loading" ? <p className="text-sm text-muted-foreground">Verifying…</p> : null}
          {state === "ok" ? <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{msg}</p> : null}
          {state === "error" ? <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{msg}</p> : null}
          {state === "idle" ? <p className="text-sm text-muted-foreground">No token in URL. Check your email or API logs.</p> : null}
          <Button asChild><Link to="/auth/signin">Go to sign in</Link></Button>
        </CardContent>
      </Card>
    </div>
  );
}
