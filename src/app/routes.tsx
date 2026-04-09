import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { ForgotPassword } from "./components/ForgotPassword";
import { SafeHerAppLayout } from "./components/SafeHerAppLayout";
import { AppDashboard } from "./components/AppDashboard";
import { TrustedContactsPage } from "./components/TrustedContactsPage";
import { ProtectionNetworkPage } from "./components/ProtectionNetworkPage";
import { HelpCenterPage } from "./components/HelpCenterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/cadastro",
    Component: Signup,
  },
  {
    path: "/esqueci-senha",
    Component: ForgotPassword,
  },
  {
    path: "/app",
    Component: SafeHerAppLayout,
    children: [
      {
        index: true,
        Component: AppDashboard,
      },
      {
        path: "dashboard",
        Component: AppDashboard,
      },
      {
        path: "contatos",
        Component: TrustedContactsPage,
      },
      {
        path: "rede",
        Component: ProtectionNetworkPage,
      },
      {
        path: "ajuda",
        Component: HelpCenterPage,
      },
    ],
  },
]);
