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
import DepartmentView from "./views/DepartmentView";
import DepartmentApplicationCreateView from "./views/DepartmentApplicationCreateView";
import MyDepartmentApplicationsView from "./views/MyDepartmentApplicationsView";
import MyDepartmentApplication from "./views/MyDepartmentApplicationView";
import InternJobApplicationView from "./views/InternJobApplicationView";
import InternMyJobApplicationsView from "./views/InternMyApplications";
import MyDepartmentApplicationsResponses from "./views/MyDepartmentApplicationsResponses";
import WorkInProgressView from "./views/WorkInProgressView";

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
        <Route
          path="/curator/mentors"
          element={
            <WorkInProgressView
              pageName={"Модуль «Работа с наставниками»"}
            />
          }
          end
        />
        {/* <Route path="/curator/mentors" element={<MentorsView />} end /> */}
        <Route
          path="/curator/statistics"
          element={
            <WorkInProgressView
              pageName={"Модуль «Статистика по кандидатам и их заявкам»"}
            />
          }
          exact
          // element={<StatisticsView isIntern={false} />}
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
        <Route path="/department" element={<DepartmentView />} end />
        <Route
          path="/department/application/create"
          element={<DepartmentApplicationCreateView />}
        />
        <Route
          path="/department/applications"
          element={<MyDepartmentApplicationsView />}
        />
        <Route
          path="/department/applications/:applicationId"
          element={<MyDepartmentApplication />}
        />
        <Route
          path="/department/applications/responses"
          // element={<MyDepartmentApplicationsResponses />}
          element={
            <WorkInProgressView
              pageName={"Модуль «Отклики от стажёров на наши заявки»"}
            />
          }
        />

        <Route path="/intern/jobs" element={<DepartmentsApplicationsView />} />
        <Route
          path="/intern/jobs/:jobId"
          element={<InternJobApplicationView />}
        />
        <Route
          path="/intern/jobs/applications"
          element={<InternMyJobApplicationsView />}
        />
        <Route
          path="/mentor/my-intern"
          element={
            <WorkInProgressView
              pageName={"Модуль «Работа с закрепленным стажёром»"}
            />
          }
        />
        <Route
          path="/mentor/my-intern/schedule"
          element={
            <WorkInProgressView
              pageName={"Модуль «Расписание закрепленного стажёра»"}
            />
          }
        />
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
