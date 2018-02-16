import React from 'react';
import { connect } from 'react-redux';
import { adActions } from '../actions';

class DetailsPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      submitted: false,
      edit:false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.render = this.render.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(adActions.getAdById(this.props.match.params.id));
  }

  handleChange(e){
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e){
    e.preventDefault();
 
    this.setState({ submitted: true });
    const { title, description } = this.state;
    const { dispatch } = this.props;
    const { id } = this.props.match.params;
    if (title && description) {
        dispatch(adActions.updateAd(title, description,id));
    }
  }

  handleEdit(e){
    this.setState({ 
      edit: !this.state.edit,
      title: this.props.ads.selectedAd.title,
      description:this.props.ads.selectedAd.description });
  }

  handleDelete(e){
    const { dispatch } = this.props;
    const { id } = this.props.match.params;
    dispatch(adActions.deleteAd(id));
  }

  render (){
    const { title, description, submitted,edit } = this.state;
    const { ads,authentication } = this.props;
    let editBtn = null;
    let dltBtn = null;
    if (authentication.user && ads.selectedAd){
      if(authentication.user.id === ads.selectedAd.author){
        editBtn = <button type="button" className="btn btn-warning" onClick={this.handleEdit}>Edit btn</button>;
        dltBtn = <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete btn</button>;
      }
    }
    return (
      <div>
        {ads.loading && <em>Loading ad...</em>}
        { edit && !ads.loading && <div className="col-md-6 col-md-offset-3">
        <h2>Edit ad</h2>
        <button type="button" className="btn btn-warning" onClick={this.handleEdit}>Hide edit</button>
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
        </div> }

        {!edit && ads.selectedAd && <div className="col-md-6 col-md-offset-3">
          <p>{ads.selectedAd.title }</p>
          <p>{ads.selectedAd.description }</p>
          {editBtn} {dltBtn}
        </div>}
      </div>
    )
  }

}

function mapStateToProps(state) {
  const { ads, authentication } = state;
  return {
    authentication,
    ads
  };
}

const connectedDetailsPage= connect(mapStateToProps)(DetailsPage);
export { connectedDetailsPage as DetailsPage };
