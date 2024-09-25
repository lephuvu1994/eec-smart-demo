import { useState } from 'preact/hooks';
import DeviceInRoomCard from './DeviceInRoomCard';

const DeviceInRoomCards = ({ children, ...props }) => {
  return (
  <div class="row row-cards p-3 align-items-stretch">
    {props.devices.map((devices, index) => (
      <DeviceInRoomCard {...props} devices={devices} index={index} />
    ))}
  </div>
)
    }

export default DeviceInRoomCards;
