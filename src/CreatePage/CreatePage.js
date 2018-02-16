import React from 'react';
import { connect } from 'react-redux';
import { adActions } from '../actions';

class CreatePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e){
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit(e){
    e.preventDefault();
 
    this.setState({ submitted: true });
    const { title, description } = this.state;
    const { dispatch,id } = this.props;
    if (title && description) {
        dispatch(adActions.createAd(title, description,id));
    }
  }
  render(){
    const { title, description, submitted } = this.state;
    return (
    <div className="col-md-6 col-md-offset-3">
    <h2>Create new ad</h2>
    <form name="form" onSubmit={this.handleSubmit}>
        <div className={'form-group' + (submitted && !title ? ' has-error' : '')}>
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" name="title" value={title} onChange={this.handleChange} />
            {submitted && !title &&
                <div className="help-block">Title is required</div>
            }
        </div>
        <div className={'form-group' + (submitted && !description ? ' has-error' : '')}>
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" name="description" value={description} onChange={this.handleChange} />
            {submitted && !description &&
                <div className="help-block">Description is required</div>
            }
        </div>
        <div className="form-group">
            <button className="btn btn-primary">Ok</button>
        </div>
    </form>
  </div>)
  }

}

function mapStateToProps(state) {
  const { id } = state.authentication.user;
  return {
    id
  };
}

const connectedCreatePage = connect(mapStateToProps)(CreatePage);
export { connectedCreatePage as CreatePage };