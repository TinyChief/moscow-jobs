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
import JobsView from "./views/JobsView";
import Welcome from "./views/Welcome";
import { apiService } from "./services/useApiService";
import FullJobView from "./views/FullJobView";
import CandidatesApplicationsView from "./views/CandidatesApplicationsView";
import MentorsView from "./views/MentorsView.jsx";
import StatisticsView from "./views/StatisticsView.jsx";
import ProfileView from "./views/Profile";

import "@fontsource/nunito";
import MakeApplication from "./views/ApplicationView";
import { UserProvider } from "./contexts/UserContext";
import { ApplicationProvider } from "./contexts/ApplicationContext";
import AlreadAuthGuard from "./auth/AlreadyAuthGuard";
import DepartmentsApplicationsView from "./views/DepartmentsApplicationsView";
import DepartmentApplication from "./views/DepartmentApplicationView";

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route
        element={
          <AuthGuard>
            <UserProvider>
              <Layout />
            </UserProvider>
          </AuthGuard>
        }
      >
        <Route
          path="/application"
          exact
          element={
            <ApplicationProvider>
              <MakeApplication />
            </ApplicationProvider>
          }
          end
        />
        <Route
          path="/candidates/applications"
          exact
          element={<CandidatesApplicationsView />}
          end
        />
        <Route
          path="/departments/applications"
          element={<DepartmentsApplicationsView />}
          end
        />
        <Route
          path="/departments/applications/:applicationId"
          element={<DepartmentApplication />}
          end
        />
        <Route path="/mentors" element={<MentorsView />} end />
        <Route
          path="/statistics"
          exact
          element={<StatisticsView isIntern={false} />}
          end
        />
        <Route
          path="/statistics/interns"
          element={<StatisticsView isIntern={true} />}
          end
        />
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
        <Route path="/profile" element={<ProfileView />} />
      </Route>
      <Route path="/" exact element={<Navigate to={"/profile"} replace />} />
      <Route path="welcome" element={<Welcome />} />
      <Route
        path="session/signin"
        element={
          <AlreadAuthGuard>
            <JwtLogin />
          </AlreadAuthGuard>
        }
      />
      <Route
        path="session/signup"
        element={
          <AlreadAuthGuard>
            <JwtRegister />
          </AlreadAuthGuard>
        }
      />
      <Route
        path="session/forgot-password"
        element={
          <AlreadAuthGuard>
            <ForgotPassword />
          </AlreadAuthGuard>
        }
      />
      <Route path="session/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
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
