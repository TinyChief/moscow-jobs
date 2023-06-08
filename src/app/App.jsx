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
import CandidatesApplicationsView from "./views/CandidatesApplicationsView";
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
          path="/candidate/application"
          exact
          element={
            <ApplicationProvider>
              <MakeApplication />
            </ApplicationProvider>
          }
          end
        />
        <Route
          path="/candidate/schedule"
          element={<WorkInProgressView pageName={"Модуль «Расписание мероприятий»"} />}
        />
        <Route
          path="/curator/candidates/applications"
          exact
          element={<CandidatesApplicationsView />}
          end
        />
        <Route
          path="/curator/departments/applications"
          element={<DepartmentsApplicationsView />}
          end
        />
        <Route
          path="/curator/departments/applications/:applicationId"
          element={<DepartmentApplication />}
          end
        />
        <Route
          path="/curator/mentors"
          element={
            <WorkInProgressView pageName={"Модуль «Работа с наставниками»"} />
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
          path="/profile"
          element={<ProfileView />}
          state={{ title: "Профиль" }}
        />
        <Route path="/staff/department" element={<DepartmentView />} end />
        <Route
          path="/staff/department/application/create"
          element={<DepartmentApplicationCreateView />}
        />
        <Route
          path="/staff/department/application/edit"
          element={<DepartmentApplicationCreateView />}
        />
        <Route
          path="/staff/department/applications"
          element={<MyDepartmentApplicationsView />}
        />
        <Route
          path="/staff/department/applications/:applicationId"
          element={<MyDepartmentApplication />}
        />
        <Route
          path="/staff/department/applications/responses"
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
          path="/intern/mentor"
          element={<WorkInProgressView pageName={"Модуль «Мой наставник»"} />}
        />
        <Route
          path="/intern/schedule"
          element={<WorkInProgressView pageName={"Модуль «Расписание мероприятий»"} />}
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
        <Route path="/" exact element={<Navigate to={"/profile"} replace />} />
      </Route>
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
