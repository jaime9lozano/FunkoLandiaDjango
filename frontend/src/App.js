import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FunkoList from "./components/FunkoList";
import FunkoDetail from "./components/FunkoDetail";

function App() {
  return (
      <Router>
          <div className="app">
              <Header />
              <Routes>
                  <Route path="/" element={<FunkoList />} />
                  <Route path="/funko/:id" element={<FunkoDetail />} />
              </Routes>
              <Footer />
          </div>
      </Router>
  );
}

export default App;
