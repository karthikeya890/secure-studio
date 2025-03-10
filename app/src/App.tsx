import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/home";
import Auth from "./pages/auth";
import NotFound from "./pages/notFound";
import HomeLayout from "./layout/home";
import ProtectedRoute from "./components/protectedRoute";
import DashBoardLayout from "./layout/dashboard";
import DashBoard from "./pages/dashboard";
import Bookings from "./pages/bookings";
import Construction from "./components/construction";
import PaymentConfirmation from "./components/bookService/paymentConfirmation";
import Home from "./pages/home";
import Pdf from "./components/pdf"
import Pdf2 from "./components/pdf2"
import Pdf3 from "./components/pdf3"
import Pdf5 from "./components/pdf5"
import Services from "./pages/services";
import BookService from "./components/bookService";
import Invoice from "./components/Invoice";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="invoice" element={<Invoice />} />
        <Route path="pdf5" element={<Pdf5 />} />

        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Auth />} />
          <Route path="pdf" element={<Pdf />} />
          <Route path="pdf2" element={<Pdf2 />} />
          <Route path="pdf3" element={<Pdf3 />} />
          <Route path="notFound" element={<NotFound />} />
        </Route>

        {/* Private Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashBoardLayout />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="/services">
              <Route index element={<Services />} />
              <Route path="book" element={<BookService />} />
              <Route path="book/confirmation" element={<PaymentConfirmation />} />
            </Route>
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