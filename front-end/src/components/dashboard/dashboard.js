import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ParkForm from '../park-form/park-form';
import * as parkActions from '../redux/action/park-action';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.parkFetch();
  }
  render() {
    const { parks, parkCreate, parkDelete, parkUpdate } = this.props;
    return (
      <div className= "dashboard">
      <h2>Create a Park</h2>
      <ParkForm
      onComplete={ parkCreate }
      />
      { parks.map((park) => {
       return (
        <div key={park._id }>
        <p>{park.name}</p>
        <p>{park.city}</p>
        <button onClick={() => parkDelete(park)}>X</button>
        <ParkForm 
        park={park}
        onComplete={ parkUpdate }
        />
        {/* <button onClick={() => parkUpdate(park)}>edit</button> */}
        </div>
       );
      }) 
      }
      </div>
    );
  }
}
Dashboard.propTypes = {
  parkFetch: PropTypes.func,
  parkCreate: PropTypes.func,
  parkDelete: PropTypes.func,
  parkUpdate: PropTypes.func,
  parks: PropTypes.array,
};
const mapStateToProps = (state) => {
  return {
    parks: state.parks,
  }
}
const mapDispatchToProps = (dispatch) => ({
    parkFetch: ()=> dispatch(parkActions.parkFetchRequest()),
    parkCreate: park => dispatch(parkActions.parkCreateRequest(park)),
    parkDelete: park => dispatch(parkActions.parkDeleteRequest(park)),
    parkUpdate: park => dispatch(parkActions.parkUpdateRequest(park)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

// parkFetchRequest, parkCreateRequest, parkDeleteRequest, parkUpdateRequest