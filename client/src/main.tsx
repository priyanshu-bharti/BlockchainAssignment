import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AllTransactions from "./pages/AllTransactions.tsx";
import TransactionDetail from "./pages/TransactionDetail.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<AllTransactions />} />
      <Route path="/:hash" element={<TransactionDetail />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>
);
