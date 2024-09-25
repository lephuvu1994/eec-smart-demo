import { Component } from 'preact';
import { connect } from 'unistore/preact';
import RoomsPage from './RoomsPage';

class Rooms extends Component {
  getRooms = async () => {
    this.setState({
      loading: true,
      getError: false
    });
    try {
      const rooms = await this.props.httpClient.get('/api/v1/room');
      this.setState({
        rooms,
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
      rooms: [],
      loading: true
    };
  }

  componentWillMount() {
    this.getRooms();
  }

  render(props, { rooms, loading, getError }) {
    return (
      <RoomsPage
        httpClient={props.httpClient}
        currentUrl={props.currentUrl}
        rooms={rooms}
        getError={getError}
        loading={loading}
      />
    );
  }
}

export default connect('httpClient,currentUrl', {})(Rooms);
