import React, {useState} from 'react';
import {BrowserRouter, Route,Switch } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';

import theme from './ui/Theme';
import Header from './ui/Header';
import Footer from './ui/Footer';


function App() {
  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme = {theme}>
      <BrowserRouter>
        <Header value={value} setValue={setValue}/>
        <Switch>
          <Route exact path="/" component={() => <div style={{height: "2000px"}}> Home</div>} />
          <Route exact path="/projects" component={() => <div>Projects</div>} />
          <Route exact path="/experience" component={() => <div>Expereince</div>} />
          <Route exact path="/interests" component={() => <div>Interests</div>} />
        </Switch>
        <Footer value={value} setValue={setValue}/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
