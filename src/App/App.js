import React from 'react';
import { Router, Route, NavLink  } from 'react-router-dom';
import { connect } from 'react-redux';
 
import { history } from '../helpers';
import { alertActions,userActions } from '../actions';
import { PrivateRoute } from '../components';
import { AdsPage } from '../AdsPage';
import { CreatePage } from '../CreatePage';
import { DetailsPage } from '../DetailsPage';

//import { EditPage } from './EditPage';
 
class App extends React.Component {
    constructor(props) {
        super(props);
 
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout(){
        const {dispatch} = this.props;
        dispatch(userActions.logout());
    }
    render() {
        const { alert } = this.props;
        const { loggedIn } = this.props;
        return (
            <div className="main">
            <Router history={history}>
            <div className="router">
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <NavLink to="/" className="navbar-brand">Start</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                
                {loggedIn && 
                        <NavLink to="/create" className="nav-link">Create</NavLink>
                }
                </li>

            </ul>
            {loggedIn && 
                <div className="nav-item">
                    <button className="btn btn-outline-primary my-2 my-sm-0" onClick={this.handleLogout}>Logout</button>
                </div>
            }
            </div>
            </nav>
            <main className="container">
                <div className="jumbotron">
                    <div className="container">
                        <div className="col-sm-8 col-sm-offset-2">
                            {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }
                            
                                <div>
                                <PrivateRoute  path='/create' component={CreatePage} />
                                
                                <Route exact path="/" component={AdsPage} />
                                <Route  path="/ad/:id" component={DetailsPage} />
                                </div>
                            
                        </div>
                    </div>
                </div>
            </main>
            </div>
            </Router>
            </div>
        );
    }
}
 
function mapStateToProps(state) {
    const { alert } = state;
    const { loggedIn } = state.authentication;
    return {
        alert,
        loggedIn
    };
}
 
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
//<PrivateRoute  path='/edit/:id' component={EditPage} /> 51