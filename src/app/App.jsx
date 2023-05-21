import AuthGuard from "./auth/AuthGuard";
import JwtLogin from "./views/sessions/JwtLogin";
import JwtRegister from "./views/sessions/JwtRegister";
import ForgotPassword from "./views/sessions/ForgotPassword";
import NotFound from "./views/sessions/NotFound";
import Layout from "./layout/MainLayout";
import {
  Route,
  createRoutesFromElements,
  createHashRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "../fake-db";
import JobsView from "./views/JobsView";
import Welcome from "./views/Welcome";
import { apiService } from "./services/useApiService";
import FullJobView from "./views/FullJobView";
import ApplicationsView from "./views/ApplicationsView";
import MentorsView from "./views/MentorsView.jsx";
import StatisticsView from "./views/StatisticsView.jsx";
import ProfileView from "./views/Profile";

import "@fontsource/nunito"


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
        <Route path="/applications" exact element={<ApplicationsView isIntern={false} />} end />
        <Route path="/applications/interns" element={<ApplicationsView isIntern={true} />} end />
        <Route path="/mentors" element={<MentorsView />} end />
        <Route path="/statistics" exact element={<StatisticsView isIntern={false} />} end />
        <Route path="/statistics/interns" element={<StatisticsView isIntern={true} />} end />
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
        <Route
          path="/profile"
          element={<ProfileView />}
        />
      </Route>
      <Route path="/" exact element={<Navigate to={"/jobs"} replace />} />
      {/* <Route path="/" element={<Welcome />} /> */}
      <Route path="welcome" element={<Welcome />} />
      <Route path="session/signin" element={<JwtLogin />} />
      <Route path="session/signup" element={<JwtRegister />} />
      <Route path="session/forgot-password" element={<ForgotPassword />} />
      <Route path="session/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
      {/* <ScrollRestoration/> */}
    </>
  )
);


export default function App() {
  return <RouterProvider router={router} />;
}

async function fullJobLoader({ params }) {
  const { data } = await apiService.getFullJob(params.id);

  return data.job;
}

async function jobsListLoader() {
  const { data } = await apiService.getJobs();

  return data.jobs;
}
