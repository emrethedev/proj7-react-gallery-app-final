import React, { Component } from "react";
import Photo from "./Photo";
import NotFound from "./NotFound";
import LoadManager from "./LoadManager";

class PhotoWrapper extends Component {

    // So we can run this when the app loads fully.
    componentDidMount() {
        let routeQuery = this.props.routeCheck.params.query;
        this.props.processLookup(routeQuery); //routequery
    };

    componentDidUpdate(prevProps) {

        console.log(prevProps);
        let routeQuery = this.props.routeCheck.params.query;
        let prevRouteQuery = prevProps.routeCheck.params.query;

        if ( routeQuery !== prevRouteQuery ) {
            this.props.processLookup(routeQuery);
        }
    }

    render() {
        
        let loadUpd = this.props.loadUpdate;
        let pics;
        let output = this.props.data;
        let outpLen = output.length;
        let minResult = 0;

        // When it is still loading we will show the loading message.
        if ( loadUpd ) {

            pics = <LoadManager />
        
        }

        // If the loading is over, we will use the "pics" to show the actual images.
        if ( outpLen > minResult ) {

            pics = output.map( pic => <Photo 
                src={`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`}
                key={pic.id}

                /> )

        }

        // When our app did every it could do but found no results we need to show an informative error message.
        if ( !loadUpd && outpLen <= minResult ) {
            pics = <NotFound />
        }

        return(
            
            <div className="photo-container">
                <h2> Results </h2>
                <ul>
                    {pics}
                </ul>
            </div>

        );
    }
}

export default PhotoWrapper;