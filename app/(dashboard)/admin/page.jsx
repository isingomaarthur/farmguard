"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Users, Trash2, CheckCircle2, AlertTriangle } from "lucide-react";
import { userAPI } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function AdminPage() {
  const router = useRouter();
  const { getAuth } = useAuth();
  const [auth, setAuth] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);

  useEffect(() => {
    const session = getAuth();
    if (!session?.token) {
      router.push("/login");
      return;
    }

    if (session.user.role !== "admin") {
      router.push("/dashboard");
      return;
    }

    setAuth(session);

    const fetchUsers = async () => {
      try {
        const response = await userAPI.getAllUsers();
        setUsers(response.users || []);
      } catch (err) {
        setError(err.message || "Unable to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [getAuth, router]);

  const handleDeleteUser = async (userId) => {
    if (!auth) return;

    const target = users.find((user) => user.id === userId);
    if (!target) return;
    if (userId === auth.user.id) {
      setError("You cannot delete your own admin account from this screen.");
      return;
    }

    if (!window.confirm(`Delete ${target.name || target.email}? This cannot be undone.`)) {
      return;
    }

    try {
      setActionMessage(null);
      await userAPI.deleteUser(userId);
      setUsers((current) => current.filter((user) => user.id !== userId));
      setActionMessage(`${target.name || target.email} was deleted successfully.`);
    } catch (err) {
      setError(err.message || "Failed to delete user.");
    }
  };

  return (
    <div className="mx-auto max-w-6xl py-2">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-fg-green">
            <ShieldCheck size={18} /> Admin panel
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink">User management</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink/70">
            Only administrators can access this page. Review registered users and remove accounts when needed.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
        <section className="rounded-xl2 border border-ink/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-ink">Managed users</p>
              <p className="mt-1 text-xs text-ink/50">{loading ? "Loading users..." : `${users.length} total user(s)`}</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-ink/5 px-3 py-1 text-sm font-medium text-ink">
              <Users size={16} /> Admin only
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-xl2 border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <AlertTriangle size={16} className="inline-block mr-2" /> {error}
            </div>
          )}

          {actionMessage && (
            <div className="mt-5 rounded-xl2 border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              <CheckCircle2 size={16} className="inline-block mr-2" /> {actionMessage}
            </div>
          )}

          <div className="mt-6 overflow-hidden rounded-xl2 border border-ink/10">
            <div className="grid grid-cols-[1.8fr_1.2fr_1fr_96px] gap-4 bg-fg-cream px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span className="text-right">Action</span>
            </div>
            <div className="divide-y divide-ink/10">
              {loading ? (
                <div className="p-6 text-sm text-ink/60">Loading user list...</div>
              ) : users.length === 0 ? (
                <div className="p-6 text-sm text-ink/60">No registered users found.</div>
              ) : (
                users.map((user) => (
                  <div key={user.id} className="grid grid-cols-[1.8fr_1.2fr_1fr_96px] gap-4 px-5 py-4 text-sm text-ink">
                    <div>
                      <p className="font-medium text-ink">{user.name || 'Unnamed user'}</p>
                      <p className="mt-1 text-xs text-ink/50">Joined {new Date(user.createdAt || user.created_at || Date.now()).toLocaleDateString()}</p>
                    </div>
                    <div className="break-words text-xs text-ink/70">{user.email}</div>
                    <div className="text-sm font-semibold text-ink">{user.role}</div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={user.id === auth?.user?.id}
                        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                          user.id === auth?.user?.id
                            ? 'cursor-not-allowed border-ink/10 bg-ink/5 text-ink/40'
                            : 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <aside className="rounded-xl2 border border-ink/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-ink">Admin controls</p>
          <div className="mt-4 space-y-3 text-sm text-ink/70">
            <p>
              Use this panel only for account administration. Deleting a user permanently removes access for that email.
            </p>
            <p>
              If this is your account, you cannot delete it from here. To remove your own account, use the profile delete action instead.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
