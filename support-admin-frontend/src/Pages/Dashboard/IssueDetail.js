
import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const IssueDetail = () => {
  const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axios.get(`https://support-fba5.onrender.com/api/support/${id}`);
        setIssue(response.data);
      } catch (error) {
        console.error("Failed to fetch issue:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch issue data.",
        });
      }
    };

    fetchIssue();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssue((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:5000/api/support/${id}`, {
        status: issue.status,
        support_reply: issue.support_reply,
      });

      if (response.status === 200) {
        const updatedIssue = await axios.get(`http://localhost:5000/api/support/${id}`);
        setIssue(updatedIssue.data);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Reply updated successfully!",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update reply.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Any unsaved changes will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, go back",
    }).then((result) => {
      if (result.isConfirmed) {
        window.history.back();
      }
    });
  };

  if (!issue) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"}`}>
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="p-4">
          <div className="bg-white p-6 rounded-lg shadow max-w-5xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Issue Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {[ 
                { label: "Issue ID", name: "issue_id", readOnly: true },
                { label: "Issue Type", name: "issue_type", readOnly: true },
                { label: "Description", name: "description", isTextarea: true, readOnly: true },
                { label: "Issue Created At", name: "issue_created_at", readOnly: true },
                { label: "Booking ID", name: "booking_id", readOnly: true },
                { label: "PNR", name: "pnr", readOnly: true },
                { label: "Total Price", name: "total_price", readOnly: true },
                { label: "Booking Status", name: "booking_status", readOnly: true },
                { label: "Booking Created At", name: "booking_created_at", readOnly: true },
                { label: "User Name", name: "user_name", readOnly: true },
                { label: "User Email", name: "user_email", readOnly: true },
              ].map((field, i) => (
                <div key={i} className="flex flex-col">
                  <label className="mb-1 text-gray-600 font-medium">{field.label}</label>
                  {field.isTextarea ? (
                    <textarea
                      name={field.name}
                      value={issue[field.name] || ""}
                      onChange={handleChange}
                      readOnly={field.readOnly}
                      rows={2}
                      className="border text-sm p-2 rounded-md bg-gray-50"
                    />
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      value={issue[field.name] || ""}
                      onChange={handleChange}
                      readOnly={field.readOnly}
                      className="border text-sm p-2 rounded-md bg-gray-50"
                    />
                  )}
                </div>
              ))}

              {/* Support Reply */}
              <div className="md:col-span-2 flex flex-col">
                <label className="mb-1 text-gray-600 font-medium">Support Reply</label>
                <textarea
                  name="support_reply"
                  value={issue.support_reply || ""}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Write your response here..."
                  className="border text-sm p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-white"
                />
              </div>

              {/* Issue Status */}
              <div className="md:col-span-2 flex flex-col mt-2">
                <label className="mb-1 text-gray-600 font-medium">Issue Status</label>
                <select
                  name="status"
                  value={issue.status || ""}
                  onChange={handleChange}
                  className="border text-sm p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-white"
                >
                  <option value="Open">Open</option>
                  <option value="Resolved">Resolved</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>

              {/* Support Reply History */}
              {issue.support_replies && issue.support_replies.length > 0 && (
                <div className="md:col-span-2 mt-4">
                  <h3 className="text-sm font-semibold mb-2">Support Reply History</h3>
                  <div className="space-y-2">
                    {[...issue.support_replies]
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .map((reply, idx) => (
                        <div key={idx} className="bg-gray-100 p-3 rounded">
                          <div className="text-sm">{reply.message}</div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Status: {reply.status}</span>
                            <span>{new Date(reply.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? "Updating..." : "Submit Reply"}
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm px-4 py-2 rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IssueDetail;
