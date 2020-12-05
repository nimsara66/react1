import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner'


class App extends React.Component {
    constructor(props) {
        super(props);
        //this is the only time we dirrectly assign this.state
        this.state = {lat: null, errorMessage: '', time: new Date().toLocaleTimeString()}; 
    }

    //this is equalent method
    //state = {lat: null, errorMessage: ''}; 

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            //we called setState!!!
            //we did not!!!
            //this.state.lat = position.coords.latitude
            position => {this.setState({lat: position.coords.latitude})},
            err => {this.setState({errorMessage: err.message})}
        );
        setInterval(() => {
            this.setState({time: new Date().toLocaleTimeString()})
            }, 1000)
    }

    renderContent() {
        if(this.state.lat) {
            return (
            <div>
                <SeasonDisplay lat={this.state.lat} time={this.state.time}/>
            </div>
            );
        } else {
            return (<Spinner 
                message={this.state.errorMessage ? 'Please accept location request' : 'Loading...'}
                />);
        }
    }

    //react says we have to define render!!!
    render() {
        return this.renderContent();
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);