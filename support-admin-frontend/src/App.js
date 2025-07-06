// import React from 'react'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {Login} from "./Pages/Login/Login.js";
// import Dashboard from './Pages/Dashboard/Dashboard.js'
// import { Home } from './Pages/Home/Home'
// import  BookingHistory from './Pages/Dashboard/BookingHistory.js'
// import SupportIssue from './Pages/Dashboard/SupportIssue.js';

// // Inside your render/return statement, use the component


// import { routes } from './Routes/routes'

// export const App = () => {
//   return (
//     <div> 
//      <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home/>} />
//           <Route path="/Home" element={<Home/>} />
//           <Route path="/Login" element={<Login />} />
//           <Route path="/Bookings" element={<BookingHistory />} />
//           <Route path="/Support" element={<SupprtIssue />} />
          
//           <Route path="/Dashboard" element={<Dashboard/>} />
//         </Routes>
//       </BrowserRouter>
//     </div>

//   )
// }








import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login/Login.js";
import Dashboard from './Pages/Dashboard/Dashboard.js';
import { Home } from './Pages/Home/Home';
import BookingHistory from './Pages/Dashboard/BookingHistory.js';
import SupportIssue from './Pages/Dashboard/SupportIssue.js';
import IssueDetail from './Pages/Dashboard/IssueDetail.js';
// import SupportPanel from './Pages/Dashboard/SupportPanel.js'; // Import the new SupportPanel component

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Bookings" element={<BookingHistory />} />
          <Route path="/Support" element={<SupportIssue />} /> {/* Use SupportPanel instead of SupportIssue */}
          <Route path="/issue/:id" element={<IssueDetail />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};





// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Login } from './Pages/Login/Login.js';
// import Dashboard from './Pages/Dashboard/Dashboard.js'; // ✅ Fixed
// import { Home } from './Pages/Home/Home';
// import { User } from './Pages/Dashboard/User.js';

// import { routes } from './Routes/routes';

// export const App = () => {
//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/Home" element={<Home />} />
//           <Route path="/Login" element={<Login />} />
//           <Route path="/User" element={<User />} />
//           <Route path="/Dashboard" element={<Dashboard />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };
