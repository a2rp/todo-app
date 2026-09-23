import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import BackToTop from "./components/BackToTop";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import TodoApp from "./todoApp";

function App() {
  return (
    <div className="appShell">
      <SiteHeader />
      <main>
        <TodoApp />
      </main>
      <SiteFooter />
      <BackToTop />
      <ToastContainer position="bottom-right" newestOnTop closeOnClick pauseOnFocusLoss />
    </div>
  );
}

export default App;
