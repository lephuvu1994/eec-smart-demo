import { Text } from 'preact-i18n';
import cx from 'classnames';

import RoomsCards from './RoomsCards';
import EmptyState from './EmptyState';
import style from './style.css';

const RoomsPage = ({ children, ...props }) => (
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
                  {props.rooms && <RoomsCards {...props} />}
                  {props.rooms && props.rooms.length === 0 && <EmptyState />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RoomsPage;
