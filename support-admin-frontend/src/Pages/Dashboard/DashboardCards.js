
import React, { useEffect, useState } from "react";

export const DashboardCards = () => {
  const [adminCount, setAdminCount] = useState(0);
  const [bookingStats, setBookingStats] = useState({
    total: 0,
    confirmed: 0,
    cancelled: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/bookings/history", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        const bookings = data.bookings || [];

        const confirmed = bookings.filter(b => b.status === "confirmed").length;
        const cancelled = bookings.filter(b => b.status === "cancelled").length;

        setAdminCount(data.admins.length);
        setBookingStats({
          total: bookings.length,
          confirmed,
          cancelled,
        });
      } else {
        console.error("Failed to fetch dashboard data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const cards = [
    { title: "Total Bookings", value: bookingStats.total, increase: "+8%" },
    { title: "Confirmed Bookings", value: bookingStats.confirmed, increase: "+4.2%" },
    { title: "Cancelled Bookings", value: bookingStats.cancelled, increase: "-1.8%" },
    { title: "All Admins", value: adminCount, increase: "+7.2%" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-gray-500 text-sm">{card.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-semibold">{card.value}</span>
            <span className={`text-sm ${card.increase.startsWith("-") ? "text-red-500" : "text-green-500"}`}>
              {card.increase}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
