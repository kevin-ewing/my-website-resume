import React, {useState} from 'react';
import {BrowserRouter, Route,Switch } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';

import theme from '../components/ui/Theme';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import LandingPage from '../components/LandingPage';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Interests from '../components/Interests';


function App() {
  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme = {theme}>
      <BrowserRouter>
        <Header value={value} setValue={setValue}/>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/experience" component={Experience} />
          <Route exact path="/interests" component={Interests} />
        </Switch>
        <Footer value={value} setValue={setValue}/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;