import { Component } from 'preact';
import { connect } from 'unistore/preact';
// import actions from './actions';
import IridiumPage from '../IridiumPage';
import DeviceTab from './DeviceTab';

class IridiumDevicePage extends Component {
  render(props, {}) {
    return (
      <IridiumPage user={props.user}>
        <DeviceTab {...props} />
      </IridiumPage>
    );
  }
}

export default connect('user')(IridiumDevicePage);
