import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminPage from "./pages/AdminPage";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

function Router() {
  const path = window.location.pathname;
  if (path === "/admin") {
    return <AdminPage />;
  }
  return <LandingPage />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}
