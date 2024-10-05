import { lazy } from "react";

export const Login = lazy(() => import("./LoginPage.jsx"));
export const Find = lazy(() => import("./FindPasswordPage.jsx"));
export const AdminMain = lazy(() => import("./admin/AdminMainPage.jsx"));
export const WorkerMain = lazy(() => import("./worker/WorkerMainPage.jsx"));
export const ResearchMain = lazy(() =>
  import("./worker/research/ResearchMainPage.jsx")
);
export const CleaningSelectMain = lazy(() =>
  import("./worker/cleaning/CleanerTaskSelectPage.jsx")
);
export const CleaningMain = lazy(() =>
  import("./worker/cleaning/CleaningMainPage.jsx")
);
export const PickUpMain = lazy(() =>
  import("./worker/cleaning/PickUpPlaceMainPage.jsx")
);
export const CollectingMain = lazy(() =>
  import("./worker/collecting/CollectingMainPage.jsx")
);
export const BasicStatistics = lazy(() =>
  import("./admin/BasicStatisticsPage.jsx")
);
export const MainTrashDistribution = lazy(() =>
  import("./admin/MainTrashDistributionPage.jsx")
);
