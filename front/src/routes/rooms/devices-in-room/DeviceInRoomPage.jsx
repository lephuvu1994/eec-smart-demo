import { Text } from 'preact-i18n';
import cx from 'classnames';

import DeviceInRoomCards from './DeviceInRoomCards';
import EmptyState from './EmptyState';
import style from './style.css';

const DeviceInRoomPage = ({ children, ...props }) => (
  <div class="page">
    <div class="page-main">
      <div class="my-3 my-md-5">
        <div class="container-fluid">
          <div class="page-header">
            <h1 class="page-title">
              <Text id="rooms.title" />
            </h1>
          </div>
          <div
            class={cx('dimmer', {
              active: props.loading
            })}
          >
            <div class="loader" />
            <div class={cx('dimmer-content', style.roomListContainer)}>
              <div class="row">
                <div class="col-lg-12">
                  {props.devices && <DeviceInRoomCards {...props} />}
                  {props.devices && props.devices.length === 0 && <EmptyState />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DeviceInRoomPage;
