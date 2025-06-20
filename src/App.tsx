import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Index from "./pages/index"; // Home page
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Analytics from "./pages/dashboard/analytics/Analytics";

import DashboardHome from "./pages/dashboard/DashboardHome";
import Cards from "./pages/dashboard/Cards/Cards";
import Transactions from "./pages/dashboard/Transactions/Transactions";
import Wallet from "./pages/dashboard/Wallet/Wallet";
import Reports from "./pages/dashboard/Reports/Reports";
import ProtectedRoute from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";
import OAuthCallback from "./pages/auth/OAuthCallback";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
   <Route path="/signin" element={
  <PublicRoute>
    <SignIn />
  </PublicRoute>
} />
   <Route path="/signup" element={
    <PublicRoute>
       <SignUp />
    </PublicRoute>
   } />

   <Route path="/auth/callback/google" element={<OAuthCallback />} />
<Route path="/auth/callback/github" element={<OAuthCallback />} />

      <Route 
        path="/dashboard/*" 
        element={
         <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} /> 
        <Route path="cards" element={<Cards/>} /> {/* /dashboard/settings */}
        <Route path="transactions" element={<Transactions />} /> {/* /dashboard/users */}
              <Route path="analytics" element={<Analytics />} /> {/* /dashboard/analytics */}

        <Route path="wallets" element={<Wallet />} /> {/* /dashboard/users */}
        <Route path="reports" element={<Reports />} /> {/* /dashboard/users */}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
