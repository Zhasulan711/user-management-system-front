import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UsersList } from "@/pages/UsersList";
import { UserFormPage } from "@/pages/UserFormPage";
import { Toaster } from "@/components/ui/sonner";
import { Layout } from "@/components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/new" element={<UserFormPage />} />
          <Route path="/users/:id/edit" element={<UserFormPage />} />
        </Routes>
      </Layout>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
