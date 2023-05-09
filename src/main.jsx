import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StyledEngineProvider, CssBaseline } from "@mui/material";
import ProjectTheme from "@/app/theme/ProjectTheme.jsx";

// third party style
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { SettingsProvider } from "./app/contexts/SettingsContext";
import { AuthProvider } from "./app/contexts/JWTAuthContext";
import { router } from "./app/App";

const root = createRoot(document.getElementById("root"));

root.render(
  <StyledEngineProvider injectFirst>
      <SettingsProvider>
        <AuthProvider>
          <ProjectTheme>
            <CssBaseline />
            <RouterProvider router={router}>

            </RouterProvider>
          </ProjectTheme>
        </AuthProvider>
      </SettingsProvider>
  </StyledEngineProvider>
);
