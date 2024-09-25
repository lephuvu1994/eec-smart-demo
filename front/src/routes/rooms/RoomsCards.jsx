import RoomCard from './RoomCard';

const RoomsCards = ({ children, ...props }) => (
  <div class="row row-cards p-3 align-items-stretch">
    {props.rooms.map((room, index) => (
      <RoomCard {...props} room={room} index={index} />
    ))}
  </div>
);

export default RoomsCards;
