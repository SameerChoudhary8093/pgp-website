/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { getAuthHeader } from "../../../../../lib/supabaseClient";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";

export default function AdminElectionResultsPage() {
  const params = useParams<{ id: string }>();
  const id = useMemo(() => parseInt(String(params?.id || "0"), 10) || 0, [params]);
  const router = useRouter();

  const [results, setResults] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const auth = await getAuthHeader();
      if (!auth?.Authorization) {
        router.push(`/join?returnTo=/admin/elections/${id}/results`);
        return;
      }
      const res = await fetch(`${API}/admin/elections/${id}/results`, { headers: { ...auth } });
      if (!res.ok) throw new Error(await res.text());
      setResults(await res.json());
    } catch (e: any) {
      setError(e?.message || "Failed to load results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-green-800">Admin: Election Results (#{id})</h1>
      {loading && <div className="rounded border p-3">Loading…</div>}
      {error && <div className="rounded border border-red-300 bg-red-50 text-red-800 p-3">{error}</div>}

      {results && (
        <div className="rounded border border-gray-200 bg-white p-5">
          <p className="mb-3 text-sm text-gray-700">
            <b>{results.election?.councilLevel} - {results.election?.position}</b>
          </p>
          <ol className="list-decimal ml-6 space-y-1 text-sm">
            {(results.results || []).map((r: any, idx: number) => (
              <li key={r.candidateUserId}>
                {r.user?.name} ({r.user?.phone}) — Votes: <b>{r.votes}</b>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
