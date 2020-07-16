// Axios for Retrieving Data from Flickr.
import axios from 'axios';

// General Imports
import React, { Component } from "react";
import './App.css';

// React Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Importing Flickr API Key.
import apiKey from "./config";

// React Components
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import Nav from "./Components/Nav";
import PhotoWrapper from "./Components/PhotoWrapper";
import Oopsie from "./Components/Oopsie";

console.info(`Current API Key Provided: ${apiKey}`);

// Sets the fetch location for Axios and determines how many items can be shown per page
// Limit set to 24 as per https://teamtreehouse.com/projects/react-gallery-app#instructions
const getSrc = `https://www.flickr.com/services/rest/?method=flickr.photos.search`;
const getLimit = 24;

class App extends Component {

  constructor(){

    super();
    this.state = {
      pics: [],
      loading: true
    };
  
  };
  
  lookup = ( query = "peppers" ) => {

    this.setState({

      pics: [],
      loading: true

    });

    axios.get(`${getSrc}&api_key=${apiKey}&tags=${query}&per_page=${getLimit}&format=json&nojsoncallback=1`)
    .then( response => {
      this.setState({

        pics: response.data.photos.photo,
        loading: false,
        query: query

      })
    })
      .catch( error => {
        console.error("Hmm... Something went wrong while fetching data!", error);
      })
    
};

  render() {

    return (

      <Router>
        <div className="container">
          <Header />
          <SearchBar whenDone={this.lookup} />
          <Nav navSearch={this.lookup} />

          <Switch>
          {/* Searching for the user, so the they do not have to */}
            <Route exact path="/" render={() => <Redirect to="/search/peppers" />} />

            <Route path="/search/:query" render={( { match }) =>  (

                <PhotoWrapper 
                  routeCheck= {match}
                  data= {this.state.pics}
                  queryData={this.state.query}
                  processLookup={this.lookup}
                  loadUpdate= {this.state.loading}
                />
              )
            }
             />
            {/* Since Switch only picks one, this will be our catch-all to show the error page Oopsie.js */}
            
            <Route component={Oopsie} />
          </Switch>
        </div>
      </Router>

    );
  }
  
}

export default App;