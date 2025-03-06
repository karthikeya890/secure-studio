import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/home";
import Auth from "./pages/auth";
import NotFound from "./pages/notFound";
import HomeLayout from "./layout/home";
import ProtectedRoute from "./components/protectedRoute";
import DashBoardLayout from "./layout/dashboard2";
import DashBoard from "./pages/dashboard";
import Bookings from "./pages/bookings";
import Invoices from "./pages/invoices";
// import Settings from "./pages/settings";
import Services from "./pages/services";
import Construction from "./components/construction";
import PaymentConfirmation from "./components/Services/paymentConfirmation";
import Home from "./pages/home";
import Pdf from "./components/pdf"
import Pdf2 from "./components/pdf2"
import BookService from "./components/Services/bookService"
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Auth />} />
          <Route path="pdf" element={<Pdf />} />
          <Route path="pdf2" element={<Pdf2 />} />
          <Route path="notFound" element={<NotFound />} />
        </Route>

        {/* Private Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashBoardLayout />}>
            <Route path="confirmation" element={<PaymentConfirmation />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="services" element={<Services />} />
            {/* <Route path="services" element={<BookService />} /> */}
            <Route path="settings" element={<Construction />} />
          </Route>
        </Route>

        {/* Unknown routes nagivated to not-found */}
        <Route path="*" element={<Navigate to="/notFound" />} />
      </Routes>
    </Router>
  )
}

export default App