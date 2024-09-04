import './App.css';
import FunkoList from "./components/FunkoList";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  return (
      <div className="app">
          <Header/>
          <Content>
              <h2>Bienvenido a la aplicación</h2>
              <p>Este es el contenido principal.</p>
          </Content>
          <Footer/>
      </div>
  );
}

export default App;
