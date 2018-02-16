import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { LoginPage } from '../LoginPage';
 
import { userActions } from '../actions';
 
class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

 
    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <div>
                    {!user &&
                        <LoginPage/>
                    }
                </div>
                
                {user && 
                    <div>
                    <h1>Hi {user.username}!</h1>
                    <p>Ты успешно зашел. В реакт приложение. Не в смысле что оно встроено в реакт, а в смысле что андрюша написал регистрацию. ЛУЛ</p>
                    </div>
                }
                
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.username  + '  id= ' + user.id}
                            </li>
                        )}
                    </ul>
                }

            </div>
        );
    }
}
 
function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}
 
const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };