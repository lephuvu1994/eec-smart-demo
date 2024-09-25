import { Component } from 'preact';
import { connect } from 'unistore/preact';
import DeviceInRoomPage from './DeviceInRoomPage';

class DeviceInRoom extends Component {
  getDevices = async () => {
    this.setState({
      loading: true,
      getError: false
    });
    try {
      const devices = await this.props.httpClient.get('/api/v1/device');
      this.setState({
        devices,
        loading: false,
        getError: false
      });
    } catch (e) {
      this.setState({
        loading: false,
        getError: true
      });
    }
  };

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      devices: [],
      loading: true
    };
  }

  componentWillMount() {
    this.getDevices();
  }

  render(props, { devices, loading, getError }) {
    return (
      <DeviceInRoomPage
        httpClient={props.httpClient}
        currentUrl={props.currentUrl}
        devices={devices}
        getError={getError}
        loading={loading}
      />
    );
  }
}

export default connect('httpClient,currentUrl', {})(DeviceInRoom);
