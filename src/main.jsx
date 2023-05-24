import { createRoot } from "react-dom/client";
import { StyledEngineProvider, CssBaseline } from "@mui/material";
import ProjectTheme from "@/app/theme/ProjectTheme.jsx";
// import "./fake-db";

// third party style
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { SettingsProvider } from "./app/contexts/SettingsContext";
import { AuthProvider } from "./app/contexts/JWTAuthContext";
import App from "./app/App";
import { ErrorProvider } from "./app/contexts/ErrorContext";
import { SnackbarProvider } from "./app/contexts/snackbarContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <StyledEngineProvider injectFirst>
    <SettingsProvider>
      <AuthProvider>
        <ProjectTheme>
          <CssBaseline />
          <SnackbarProvider>
            <ErrorProvider>
              <App />
            </ErrorProvider>
          </SnackbarProvider>
        </ProjectTheme>
      </AuthProvider>
    </SettingsProvider>
  </StyledEngineProvider>
);
