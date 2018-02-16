import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { LoginPage } from '../LoginPage';
import { adActions } from '../actions';

//TODO here needs to be list of all ads, if ad author is curent user then show edit and delete buttons
class AdsPage extends React.Component {
  componentDidMount() {
      this.props.dispatch(adActions.getAllAds());
  }

  render(){
    const { user,ads } = this.props;
    return (
      

    
    <div>
      <div>
      <div>
      {!user &&
              <LoginPage/>
          }
      </div>
      
      {user && 
          <div>
          <h1>Hi {user.username}!</h1>
          </div>
      }
      </div>
      {ads.loading && <em>Loading ads list...</em>}

      { ads.ads && 
      <table className="table">
        <thead>
          <tr>
          <th scope="col">#id</th>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
            {ads.ads.map((ad) =>
                  <tr key={ad.id }>
                    <th scope="row">{ ad.id }</th>
                    <td>{ad.title}</td>
                    <td>{ad.author}</td>
                    
                    <td><Link to={"/ad/"+ad.id} ><button type="button" className="btn btn-primary">Details</button></Link></td>
                  </tr>
            )}
        </tbody>
      </table> }


      { !ads.loading && ads.length === 0 &&
      <p>No ads added yet</p>}
    </div>
    )
  }
}


function mapStateToProps(state) {
  const { users, authentication,ads } = state;
  const { user } = authentication;

  return {
      user,
      users,
      ads
  };
}


const connectedAdsPage = connect(mapStateToProps)(AdsPage);
export { connectedAdsPage as AdsPage };