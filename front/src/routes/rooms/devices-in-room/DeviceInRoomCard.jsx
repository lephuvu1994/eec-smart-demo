import { useState, useEffect, useCallback } from 'preact/hooks';
import cx from 'classnames';
import style from './style.css';
import useLongPress from '../../../hooks/useLongPress';
import classNames from 'classnames';
import { WEBSOCKET_MESSAGE_TYPES } from '../../../../../server/utils/constants';

const DeviceInRoomCard = ({ ...props }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusLight, setStatusLight] = useState(props.devices.features[0].last_value);

  const onLongPress = () => {
    setIsEditing(true);
  };

  const setValueDevice = async (deviceFeature, value) => {
    try {
      setIsLoading(true);
      await props.httpClient.post(`/api/v1/device_feature/${deviceFeature.selector}/value`, {
        value
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = async () => {
    const onOffFeature = props.devices.features.find(currentFeature => {
      return currentFeature.category === 'light' && currentFeature.type === 'binary';
    });
    if (onOffFeature) {
      await setValueDevice(onOffFeature, !statusLight);
    }
    setIsEditing(false);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500
  };

  const longPressEvent = useLongPress(onLongPress, handleClick, defaultOptions);

  const handleChangeEdit = async () => {
    console.log('edit save change');
  };
  const handleUpdatePayload = useCallback(
    payload => {
      const onOffFeature = props.devices.features.find(currentFeature => {
        return currentFeature.category === 'light' && currentFeature.type === 'binary';
      });
      if (onOffFeature && payload.device_feature_selector === onOffFeature.selector) {
        setStatusLight(payload.last_value);
        setIsLoading(false);
      }
    },
    [props]
  );

  useEffect(() => {
    if (props.httpClient) {
      props.httpClient.session.dispatcher.addListener(WEBSOCKET_MESSAGE_TYPES.DEVICE.NEW_STATE, handleUpdatePayload);
    }
    return () => {
      props.httpClient.session.dispatcher.removeListener(WEBSOCKET_MESSAGE_TYPES.DEVICE.NEW_STATE, handleUpdatePayload);
    };
  }, []);

  return (
    <>
      <div
        class={cx('dimmer', {
          active: isLoading
        })}
      >
        <div class="loader" />
        <div
          className={cx(style.devices_box, {
            [style.devices_box_on]: statusLight
          })}
          data-bs-target="#exampleModal"
          data-bs-toggle="modal"
          type="button"
          {...longPressEvent}
        >
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center justify-content-between">
              <div
                className={cx(style.device_icon, {
                  [style.light_icon_on]: statusLight
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
                      className="primary-path"
                      d="M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z"
                    ></path>{' '}
                  </g>{' '}
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="card-title m-0">{props.devices.name}</h4>
              {props.devices.features.map(
                (feature, index) =>
                  feature.category == 'switch' &&
                  feature.type == 'binary' && (
                    <small className="text-muted pr-1">
                      {props.devices.features[index].last_value == 1 ? 'Bật' : 'Tắt'}
                    </small>
                  )
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={classNames(isEditing ? 'show' : '', 'modal modal-blur fade')}
        id="exampleModal"
        style={{
          display: isEditing ? 'flex' : 'none',
          justifyContent: 'center',
          alignContent: 'center'
        }}
        tabindex="-1"
      >
        <div className={cx('modal-dialog', style.modal_dialog_center)} role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi beatae delectus deleniti dolorem
              eveniet facere fuga iste nemo nesciunt nihil odio perspiciatis, quia quis reprehenderit sit tempora totam
              unde.
            </div>
            <div className="modal-footer">
              <button type="button" onClick={() => setIsEditing(false)} className="btn me-auto" data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleChangeEdit;
                }}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceInRoomCard;
