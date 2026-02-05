import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <p>Quicksilver - Email 2.0</p>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
