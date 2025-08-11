import "./App.css";

const Intro = ({ children }) => <p className="App-intro">{children}</p>;

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
        <Intro>Hello everyone</Intro>
      </header>
    </div>
  );
}

export default App;
