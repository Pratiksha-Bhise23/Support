
import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import axios from "axios";

const statusColor = {
  confirmed: "text-green-600",
  pending: "text-yellow-600",
  cancelled: "text-red-600",
};

const BookingHistory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookings/history");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching booking history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Return a default message if the date is invalid
    }
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-IN", options);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"}`}>
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div className="p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Booking History</h2>

            {loading ? (
              <p>Loading booking history...</p>
            ) : bookings.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-3 border-b">Booking ID</th>
                      <th className="p-3 border-b">User ID</th>
                      <th className="p-3 border-b">Flight ID</th>
                      <th className="p-3 border-b">Total Price</th>
                      <th className="p-3 border-b">Status</th>
                      <th className="p-3 border-b">Booking Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.booking_id} className="hover:bg-gray-50">
                        <td className="p-3 border-b">{booking.booking_id}</td>
                        <td className="p-3 border-b">{booking.user_id}</td>
                        <td className="p-3 border-b">{booking.flight_id}</td>
                        <td className="p-3 border-b">₹{parseFloat(booking.total_price).toLocaleString()}</td>
                        <td className={`p-3 border-b font-medium ${statusColor[booking.status.toLowerCase()] || "text-gray-600"}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </td>
                        <td className="p-3 border-b">{formatDate(booking.booking_date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
