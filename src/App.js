import Sidebar from "./components/Sidebar";
import News from "./containers/NewsContainer";
import Events from "./containers/EventsContainer";
// import News from "./components/news/index";
// import Events from "./components/events/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./bootstrap.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="con">
      <ToastContainer hideProgressBar={true} />
      <Router>
        <Sidebar>
          <Routes>
            <Route exact path="/news" element={<News />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </Sidebar>
      </Router>
    </div>
  );
}

export default App;
