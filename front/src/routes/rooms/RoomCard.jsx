import { Localizer } from 'preact-i18n';
import { Component } from 'preact';
import { Link } from 'preact-router/match';
// import { MAX_LENGTH_TAG } from './constant';

class RoomCard extends Component {
  switchActiveScene = async () => {
    await this.setState({ saving: true });
    await this.props.switchActiveScene(this.props.index);
    await this.setState({ saving: false });
  };

  render(props) {
    return (
      <div class="col-lg-3 p-2">
        <div class="card h-100 d-flex flex-column justify-content-between">
          <Link href={`${props.currentUrl}/${props.room.selector}`}>
            <Localizer>
              <img class="" src={'/assets/images/rooms.jpg'} alt={''} />
            </Localizer>
          </Link>
          <div class="p-3">
            <h4>
              <Link href={`${props.currentUrl}/${props.room.selector}`}>
                <h4>{props.room.name}</h4>
              </Link>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomCard;
