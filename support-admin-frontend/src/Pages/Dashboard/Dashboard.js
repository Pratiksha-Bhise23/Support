

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { DashboardCards } from "./DashboardCards";
import axios from "axios";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/support/history"); // Adjust this API to your backend
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    // Filter tickets by selectedDate
    const filtered = tickets.filter((ticket) => {
      const ticketDate = new Date(ticket.created_at); // assuming created_at field
      return (
        ticketDate.toDateString() === selectedDate.toDateString()
      );
    });
    setFilteredTickets(filtered);
  }, [selectedDate, tickets]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"}`}>
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <main className="p-6">
          <h2 className="text-xl font-bold mb-6">All Support Tickets</h2>

          {/* Dashboard Cards */}
          <DashboardCards />

          {/* Calendar Section */}
          <div className="mt-6 bg-white p-4 rounded shadow w-fit">
            <Calendar onChange={setSelectedDate} value={selectedDate} />
          </div>

          {/* Tickets List for Selected Date */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">
              Tickets for: {selectedDate.toDateString()}
            </h3>

            {filteredTickets.length > 0 ? (
              filteredTickets.map((t) => (
                <div key={t.id} className="bg-white shadow rounded p-4 mb-3">
                  <p className="font-semibold text-gray-800">
                    {t.issue_type} - <span className="text-sm text-gray-500">{t.status}</span>
                  </p>
                  <p className="text-gray-600">{t.description?.slice(0, 50)}...</p>
                  <Link to={`/ticket/${t.id}`} className="text-blue-500 hover:underline">
                    View
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tickets found for selected date.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

