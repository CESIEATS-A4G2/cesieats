import logo from './logo.svg';
import TopNavBar from './components/TopNavBar';
import SiteFooter from './components/SiteFooter';
import './App.css';

function App() {
  return (
    <div className="App">

      <TopNavBar/>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <SiteFooter/>
    </div>
  );
}

export default App;
