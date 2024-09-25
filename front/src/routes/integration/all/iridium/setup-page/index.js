import { Component } from 'preact';
import { connect } from 'unistore/preact';
import integrationsActions from '../../../../../actions/integration';
import IridiumPage from '../IridiumPage';
import SetupForm from './SetupForm';
import { RequestStatus } from '../../../../../utils/consts';
import { WEBSOCKET_MESSAGE_TYPES } from '../../../../../../../server/utils/constants';

class IridiumNodePage extends Component {
  loadStatus = async () => {
    try {
      const mqttStatus = await this.props.httpClient.get('/api/v1/service/iridium/status');
      this.setState({
        mqttConnected: mqttStatus.connected
      });
    } catch (e) {
      this.setState({
        mqttConnectionError: RequestStatus.NetworkError
      });
      console.error(e);
    }
  };

  loadProps = async () => {
    let configuration = {};
    try {
      configuration = await this.props.httpClient.get('/api/v1/service/iridium/config');
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({
        mqttUrl: configuration.mqttUrl,
        mqttUsername: configuration.mqttUsername,
        mqttPassword: configuration.mqttPassword
      });
    }
  };

  updateConfiguration = config => {
    this.setState(config);
  };

  saveConfiguration = async e => {
    e.preventDefault();
    this.setState({
      connectMqttStatus: RequestStatus.Getting,
      mqttConnected: false,
      mqttConnectionError: undefined
    });
    try {
      const { mqttUrl, mqttUsername, mqttPassword } = this.state;
      await this.props.httpClient.post(`/api/v1/service/iridium/connect`, {
        mqttUrl,
        mqttUsername,
        mqttPassword
      });

      this.setState({
        connectMqttStatus: RequestStatus.Success
      });
    } catch (e) {
      console.error(e);
      this.setState({
        connectMqttStatus: RequestStatus.Error
      });
    }
  };

  displayConnectedMessage = () => {
    // display 3 seconds a message "MQTT connected"
    this.setState({
      mqttConnected: true,
      connectMqttStatus: undefined,
      mqttConnectionError: undefined
    });
  };

  displayMqttError = error => {
    this.setState({
      mqttConnected: false,
      connectMqttStatus: undefined,
      mqttConnectionError: error
    });
  };

  componentWillMount() {
    // this.props.getIntegrationByName('mqtt');
    // this.loadStatus();
    // this.loadProps();
    // this.props.session.dispatcher.addListener(WEBSOCKET_MESSAGE_TYPES.MQTT.CONNECTED, this.displayConnectedMessage);
    // this.props.session.dispatcher.addListener(WEBSOCKET_MESSAGE_TYPES.MQTT.ERROR, this.displayMqttError);
  }

  componentWillUnmount() {
    // this.props.session.dispatcher.removeListener(WEBSOCKET_MESSAGE_TYPES.MQTT.CONNECTED, this.displayConnectedMessage);
    // this.props.session.dispatcher.removeListener(WEBSOCKET_MESSAGE_TYPES.MQTT.ERROR, this.displayMqttError);
  }

  render(props, state) {
    return (
      <IridiumPage user={props.user}>
        <SetupForm
          {...props}
          {...state}
          loadStatus={this.loadStatus}
          loadProps={this.loadProps}
          updateConfiguration={this.updateConfiguration}
          saveConfiguration={this.saveConfiguration}
        />
      </IridiumPage>
    );
  }
}

export default connect('user,session,httpClient', integrationsActions)(IridiumNodePage);
