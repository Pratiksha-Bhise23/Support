
import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const statusStyles = {
  Open: "bg-pink-100 text-pink-800 px-3 py-1 rounded-full",
  Resolved: "bg-green-100 text-green-800 px-3 py-1 rounded-full",
};

const SupportIssue = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/support");
        const sortedIssues = response.data.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
        setIssues(sortedIssues);
      } catch (error) {
        console.error("Error fetching support issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  useEffect(() => {
    let filtered = issues;

    // Filter by status
    if (selectedStatus !== "All") {
      filtered = filtered.filter((issue) => issue.status === selectedStatus);
    }

    // Filter by search input (booking ID or issue ID)
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((issue) =>
        issue.booking_id.toString().includes(searchTerm.trim()) ||
        issue.id.toString().includes(searchTerm.trim())
      );
    }

    setFilteredIssues(filtered);
  }, [selectedStatus, searchTerm, issues]);

  const handleView = (id) => {
    navigate(`/issue/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"}`}>
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <main className="p-6">
          <h2 className="text-xl font-bold mb-6">Support Issues</h2>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <label htmlFor="statusFilter" className="mr-2 font-medium">Filter by Status:</label>
              <select
                id="statusFilter"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border rounded px-3 py-1 bg-white"
              >
                <option value="All">All</option>
                <option value="Open">Open</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div>
              <input
                type="text"
                placeholder="Search by Booking ID or Issue ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border px-4 py-2 rounded-md w-full md:w-80 bg-white"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            {loading ? (
              <p>Loading support issues...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-3 border-b">Issue ID</th>
                      <th className="p-3 border-b">Booking ID</th>
                      <th className="p-3 border-b">Type</th>
                      <th className="p-3 border-b">Status</th>
                      <th className="p-3 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIssues.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          No support issues found.
                        </td>
                      </tr>
                    ) : (
                      filteredIssues.map((issue) => (
                        <tr key={issue.issue_id} className="hover:bg-gray-50">
                          <td className="p-3 border-b">{issue.id}</td>
                          <td className="p-3 border-b">{issue.booking_id}</td>
                          <td className="p-3 border-b">{issue.issue_type}</td>
                          <td className="p-3 border-b">
                            <span className={`font-medium ${statusStyles[issue.status]}`}>
                              {issue.status}
                            </span>
                          </td>
                          <td className="p-3 border-b">
                            <button
                              className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
                              onClick={() => handleView(issue.id)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupportIssue;
