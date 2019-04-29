import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

class Clients extends Component {
  state = {
    totalOwned: null
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if (clients) {
      // Add balances
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      return { totalOwed: total };
    }

    return null;
  }

  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                {' '}
                <i className="fas fa-users" /> Contacts{' '}
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Donated : {' '}
                <span className="text-dark">
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
                /$400.00  
              </h5>
            </div>
          </div>

          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Donated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>
                  ${parseFloat(client.balance).toFixed(2)}
                  </td>
                  {client.balance ==0 ?
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-info btn-sm"
                    >
                     Sent Notification
                    </Link>
                  </td> : 
          
                  <td>
                    <Link
                    to={`/client/${client.id}`}
                    className="btn btn-success btn-sm"
                  >
                  Donated
                  </Link>
                  </td>
                  }
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
