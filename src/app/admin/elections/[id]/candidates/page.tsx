/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getAuthHeader } from "../../../../../lib/supabaseClient";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";

export default function AdminElectionCandidatesPage() {
  const params = useParams<{ id: string }>();
  const id = useMemo(() => parseInt(String(params?.id || "0"), 10) || 0, [params]);

  const [detail, setDetail] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // form
  const [userId, setUserId] = useState("");
  const [actorUserId, setActorUserId] = useState("1");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/elections/${id}`);
      const data = await res.json();
      setDetail(data);
    } catch (e: any) {
      setError(e?.message || "Failed to load election");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setSubmitting(true);
      const auth = await getAuthHeader();
      const res = await fetch(`${API}/admin/elections/${id}/candidates`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...auth },
        body: JSON.stringify({ userId: parseInt(userId || "0", 10), actorUserId: parseInt(actorUserId || "0", 10), reason }),
      });
      if (!res.ok) throw new Error(await res.text());
      setUserId("");
      setReason("");
      await load();
    } catch (e: any) {
      setError(e?.message || "Add candidate failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold text-green-800">Admin: Manage Candidates (Election #{id})</h1>
      </div>
      {loading && <div className="rounded border p-3">Loading…</div>}
      {error && <div className="rounded border border-red-300 bg-red-50 text-red-800 p-3">{error}</div>}

      {detail && (
        <div className="rounded border border-gray-200 bg-white p-5">
          <p className="mb-3 text-sm text-gray-700">
            <b>{detail.election?.councilLevel} - {detail.election?.position}</b> ({detail.election?.status})
          </p>
          <h3 className="font-medium mb-2">Candidates</h3>
          <ul className="divide-y">
            {(detail.candidates || []).map((c: any) => (
              <li key={c.id} className="py-2 text-sm flex items-center justify-between">
                <span>{c.user?.name} ({c.user?.phone}) — Votes: <b>{c.votes}</b></span>
                <span className="text-xs text-gray-500">userId: {c.user?.id}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={onAdd} className="rounded border border-gray-200 bg-white p-5">
        <h3 className="text-lg font-medium mb-3">Add Candidate</h3>
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-sm text-gray-700">
            Candidate User ID
            <input value={userId} onChange={(e) => setUserId(e.target.value)} className="ml-2 border rounded px-2 py-1 w-40" />
          </label>
          <label className="text-sm text-gray-700">
            Actor User ID
            <input value={actorUserId} onChange={(e) => setActorUserId(e.target.value)} className="ml-2 border rounded px-2 py-1 w-40" />
          </label>
          <label className="text-sm text-gray-700 flex-1">
            Reason
            <input value={reason} onChange={(e) => setReason(e.target.value)} className="ml-2 border rounded px-2 py-1 w-full" />
          </label>
          <button type="submit" disabled={submitting} className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded">Add</button>
        </div>
      </form>
    </div>
  );
}
