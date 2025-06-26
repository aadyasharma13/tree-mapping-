"use client";
import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF", "#FF6699", "#33CC99", "#FF4444"];

export default function Dashboard() {
  const [tagsPerDay, setTagsPerDay] = useState([]);
  const [tagsByType, setTagsByType] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [perDayRes, byTypeRes, usersRes] = await Promise.all([
          fetch("http://localhost:5001/api/dashboard/tags-per-day"),
          fetch("http://localhost:5001/api/dashboard/tags-by-type"),
          fetch("http://localhost:5001/api/dashboard/top-users")
        ]);
        if (!perDayRes.ok || !byTypeRes.ok || !usersRes.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        setTagsPerDay(await perDayRes.json());
        setTagsByType(await byTypeRes.json());
        setTopUsers(await usersRes.json());
      } catch (err) {
        // Fallback to demo data
        setTagsPerDay([
          { _id: "2024-06-20", count: 3 },
          { _id: "2024-06-21", count: 5 },
          { _id: "2024-06-22", count: 2 },
          { _id: "2024-06-23", count: 7 },
          { _id: "2024-06-24", count: 4 },
          { _id: "2024-06-25", count: 6 },
          { _id: "2024-06-26", count: 1 }
        ]);
        setTagsByType([
          { _id: "tree", count: 15 },
          { _id: "lake", count: 4 },
          { _id: "park", count: 2 }
        ]);
        setTopUsers([
          { username: "alice", points: 120, badges: ["Tree Planter", "Top Contributor"] },
          { username: "bob", points: 90, badges: ["Lake Saver"] },
          { username: "carol", points: 70, badges: [] }
        ]);
        setError("Backend unavailable. Showing demo data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🌱 Community Tagging Dashboard</h1>
      {error && (
        <div className="p-4 mb-4 bg-yellow-100 text-yellow-800 rounded">
          {error}
        </div>
      )}

      {/* Tags Per Day Bar Chart */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Tagging Activity (Last 7 Days)</h2>
        <div className="bg-white rounded shadow p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tagsPerDay} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="_id" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Tags By Type Pie Chart */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Tags by Type</h2>
        <div className="bg-white rounded shadow p-4 flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tagsByType}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ _id }) => _id}
              >
                {tagsByType.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Leaderboard Table */}
      <section>
        <h2 className="text-xl font-semibold mb-2">🏆 Leaderboard (Top 10 Users)</h2>
        <div className="bg-white rounded shadow p-4 overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Username</th>
                <th className="py-2 px-4">Points</th>
                <th className="py-2 px-4">Badges</th>
              </tr>
            </thead>
            <tbody>
              {topUsers.map((user, idx) => (
                <tr key={user._id || user.username} className={idx === 0 ? "font-bold bg-yellow-100" : ""}>
                  <td className="py-2 px-4">{idx + 1}</td>
                  <td className="py-2 px-4">{user.username}</td>
                  <td className="py-2 px-4">{user.points}</td>
                  <td className="py-2 px-4">
                    {user.badges && user.badges.length > 0 ? (
                      <ul className="flex flex-wrap gap-2">
                        {user.badges.map((badge, i) => (
                          <li key={i} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{badge}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
} 