import AuthGuard from "./auth/AuthGuard";
import JwtLogin from "./views/sessions/JwtLogin";
import JwtRegister from "./views/sessions/JwtRegister";
import ForgotPassword from "./views/sessions/ForgotPassword";
import NotFound from "./views/sessions/NotFound";
import Layout from "./layout/MainLayout";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  createHashRouter,
} from "react-router-dom";
import "../fake-db";
import JobsView from "./views/JobsView";
import Welcome from "./views/Welcome";
import { apiService } from "./services/useApiService";
import FullJobView from "./views/FullJobView";
import { useEffect } from "react";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route
          path="/jobs"
          exact
          element={<JobsView />}
          loader={jobsListLoader}
          end
        />
        <Route
          path="/jobs/:id"
          element={<FullJobView />}
          loader={fullJobLoader}
        />
      </Route>
      {/* <Route path="/" exact element={<Navigate to={"/jobs"} replace />} /> */}
      <Route path="/" element={<Welcome />} />
      <Route path="welcome" element={<Welcome />} />
      <Route path="session/signin" element={<JwtLogin />} />
      <Route path="session/signup" element={<JwtRegister />} />
      <Route path="session/forgot-password" element={<ForgotPassword />} />
      <Route path="session/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);

async function fullJobLoader({ params }) {
  const { data } = await apiService.getFullJob(params.id);

  return data.job;
}

async function jobsListLoader() {
  const { data } = await apiService.getJobs();

  return data.jobs;
}

// export function App() {
//   useEffect((_) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       return api
//         .getUserData()
//         .then((res) => {
//           setUser(res);
//           setLoggedIn(true);
//           getOrders();
//         })
//         .catch((err) => {
//           setLoggedIn(false);
//           history.push("/signin");
//         });
//     }
//     setLoggedIn(false);
//   }, []);
// }
