import { Component } from 'preact';
import cx from 'classnames';
import style from './style.css';

class DeviceInRoomCard extends Component {
  updateValue = async () => {
    console.log('click');
  };
  render(props) {
    return (
      <div
        class={cx(style.devices_box, {
          [style.devices_box_on]: props.devices.features[0].last_value
        })}
        type="button"
        onClick={this.updateValue}
      >
        <div class="d-flex flex-column">
          <div class="d-flex align-items-center justify-content-between">
            <div
              class={cx(style.device_icon, {
                [style.light_icon_on]: props.devices.features[0].last_value
              })}
            >
              <svg
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                {' '}
                <g>
                  <path
                    class="primary-path"
                    d="M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z"
                  ></path>{' '}
                </g>{' '}
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <h4 class="card-title m-0">{props.devices.name}</h4>
            {props.devices.features.map(
              (feature, index) =>
                feature.category == 'switch' &&
                feature.type == 'binary' && (
                  <small class="text-muted pr-1">{props.devices.features[index].last_value == 1 ? 'Bật' : 'Tắt'}</small>
                )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default DeviceInRoomCard;
