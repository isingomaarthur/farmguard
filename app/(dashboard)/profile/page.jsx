"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, MapPin, Sprout, Bell, Lock, LogOut, ChevronRight, X } from "lucide-react";
import { authAPI, userAPI, notificationAPI } from "@/lib/api";
import { useAuth } from "@/lib/auth";

const SETTINGS_ROWS = [
  { label: "Edit Profile", icon: Sprout },
  { label: "Notification Preferences", icon: Bell },
  { label: "Change Password", icon: Lock },
];

// Edit Profile Modal
function EditProfileModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    farmName: user?.farmName || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Update profile via API
      const response = await userAPI.updateProfile(formData);
      setSuccess("Profile updated successfully");
      setTimeout(() => onSave(formData), 1500);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-ink">Edit Profile</h2>
          <button onClick={onClose} className="text-ink/50 hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 border border-green-200">
              {success}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fg-green"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fg-green"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Farm Name</label>
            <input
              type="text"
              name="farmName"
              value={formData.farmName}
              onChange={handleChange}
              className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fg-green"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-ink/10 py-2 text-sm font-medium text-ink hover:bg-ink/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-fg-green py-2 text-sm font-medium text-white hover:bg-fg-green/90 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Notification Preferences Modal
function NotificationPreferencesModal({ onClose }) {
  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    emailReports: true,
    pushNotifications: true,
    smsAlerts: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleToggle = (key) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Save preferences via API
      await notificationAPI.updatePreferences(preferences);
      setSuccess("Preferences updated");
      setTimeout(onClose, 1500);
    } catch (err) {
      console.error("Failed to save preferences", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-ink">Notification Preferences</h2>
          <button onClick={onClose} className="text-ink/50 hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {success && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 border border-green-200">
              {success}
            </div>
          )}

          <div className="space-y-3">
            {[
              { key: "emailAlerts", label: "Email Alerts", desc: "Receive alerts via email" },
              { key: "emailReports", label: "Email Reports", desc: "Weekly farm reports" },
              { key: "pushNotifications", label: "Push Notifications", desc: "In-app notifications" },
              { key: "smsAlerts", label: "SMS Alerts", desc: "Critical alerts via SMS" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-ink">{label}</p>
                  <p className="text-xs text-ink/60">{desc}</p>
                </div>
                <button
                  onClick={() => handleToggle(key)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    preferences[key] ? "bg-fg-green" : "bg-ink/20"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      preferences[key] ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-ink/10 py-2 text-sm font-medium text-ink hover:bg-ink/5"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 rounded-lg bg-fg-green py-2 text-sm font-medium text-white hover:bg-fg-green/90 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Change Password Modal
function ChangePasswordModal({ onClose }) {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwords.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await authAPI.changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      setSuccess("Password changed successfully");
      setTimeout(onClose, 1500);
    } catch (err) {
      setError(err.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-ink">Change Password</h2>
          <button onClick={onClose} className="text-ink/50 hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 border border-green-200">
              {success}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fg-green"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fg-green"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-ink/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fg-green"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-ink/10 py-2 text-sm font-medium text-ink hover:bg-ink/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-fg-green py-2 text-sm font-medium text-white hover:bg-fg-green/90 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { clearAuth } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAPI.getCurrentUser();
        setUser(response.user);
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      clearAuth();
      router.push("/login");
    }
  };

  const handleSettingClick = (label) => {
    if (label === "Edit Profile") {
      setActiveModal("edit-profile");
    } else if (label === "Notification Preferences") {
      setActiveModal("notifications");
    } else if (label === "Change Password") {
      setActiveModal("password");
    }
  };

  const handleProfileSave = (updatedData) => {
    setUser({ ...user, ...updatedData });
    setActiveModal(null);
  };

  const initials = user?.name?.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "U";

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Profile</h1>

      <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-ink/10 bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-fg-green text-2xl font-bold text-white">
          {loading ? "..." : initials}
        </div>
        <div className="flex-1">
          <p className="font-display text-xl font-bold text-ink">{loading ? "Loading profile..." : user?.name || "User"}</p>
          <span className="mt-1 inline-block rounded-full bg-fg-green/10 px-2.5 py-0.5 text-xs font-semibold text-fg-green">
            {user?.role || "Farmer"}
          </span>
          <div className="mt-3 flex flex-col gap-1.5 text-sm text-ink/60 sm:flex-row sm:gap-4">
            <span className="flex items-center justify-center gap-1.5 sm:justify-start">
              <Phone size={14} /> {user?.email || "user@farmguard.local"}
            </span>
            <span className="flex items-center justify-center gap-1.5 sm:justify-start">
              <MapPin size={14} /> {user?.farmName || "FarmGuard"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
        <p className="font-display text-lg font-bold text-ink">Farm details</p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-ink/45">Farm name</p>
            <p className="mt-0.5 text-sm font-medium text-ink">{user?.farmName || "My Farm"}</p>
          </div>
          <div>
            <p className="text-xs text-ink/45">Account role</p>
            <p className="mt-0.5 text-sm font-medium text-ink">{user?.role || "Farmer"}</p>
          </div>
          <div>
            <p className="text-xs text-ink/45">Status</p>
            <p className="mt-0.5 text-sm font-medium text-green-700">Active</p>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm">
        {SETTINGS_ROWS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => handleSettingClick(label)}
            className="flex w-full items-center gap-3 border-b border-ink/10 px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-ink/[0.03]"
          >
            <Icon size={18} className="text-ink/50" />
            <span className="flex-1 text-sm font-medium text-ink">{label}</span>
            <ChevronRight size={16} className="text-ink/30" />
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-5 py-4 text-left text-fg-critical transition-colors hover:bg-fg-critical/5"
        >
          <LogOut size={18} />
          <span className="flex-1 text-sm font-medium">Log Out</span>
        </button>
      </div>

      {/* Modals */}
      {activeModal === "edit-profile" && user && (
        <EditProfileModal
          user={user}
          onClose={() => setActiveModal(null)}
          onSave={handleProfileSave}
        />
      )}
      {activeModal === "notifications" && (
        <NotificationPreferencesModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "password" && (
        <ChangePasswordModal onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}
