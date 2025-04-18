import { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./components/authComponents/Login";
import Home from "./components/authComponents/Home";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { useSelector } from "react-redux";
import UserDetailPage from "./pages/user/UserDetailPage";
import UserListingPage from "./pages/user/UserListingPage";
import Student from "./pages/students/Student";
import StudentDetailPage from "./pages/students/StudentDetailPage";
import VideoPage from "./SamplePages/VideoPage";
import AdminChapterDetailPage from "./pages/academic/admin/chapter/detailPage/AdminChapterDetailPage";
import AdminClass9ChapterTab from "./pages/academic/admin/chapter/listing/class9/AdminClass9ChapterTab";
import LiveSection from "./pages/videos/liveClasses/LiveSection";
import Setup from "./pages/setup/Setup";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const isLoggedIn = useSelector((state) => state.isLoggedin);

  const user = isLoggedIn; // Replace with actual authentication logic later

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            {/* Public Routes */}
            {/* If logged in, redirect to Dashboard from login page */}
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route path="/home" element={<Home />} />

            {/* Protected Layout */}
            <Route element={<ProtectedRoutes user={user} />}>
              <Route
                element={
                  <>
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                      <Topbar setIsSidebar={setIsSidebar} />
                      <Outlet />{" "}
                      {/* This makes sure the child routes render inside the layout */}
                    </main>
                  </>
                }
              >
                <Route path="/" element={<Dashboard />} />
                <Route path="/user/:id" element={<UserDetailPage />} />
                <Route path="/user" element={<UserListingPage />} />
                <Route path="/students" element={<Student />} />
                <Route path="/students/:id" element={<StudentDetailPage />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/liveclasses" element={<LiveSection />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/chapters" element={<VideoPage />} />
                <Route path="/admin/chapters" element={<AdminClass9ChapterTab />} />
                <Route path="/admin/chapters/:id" element={<AdminChapterDetailPage />} />
                <Route path="/setup" element={<Setup />} />
              </Route>
            </Route>

            {/* Redirect unknown routes to login if not logged in */}
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

