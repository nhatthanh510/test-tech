import { RoomPlan as RoomPlanType } from '@/util/transform'

const RoomPlan: React.FC<RoomPlanType> = ({ RoomDescription, RoomPrice, roomid, roomcount, roomtype, Refundable, NbAdults, NbChildren }) => {
  return (
    <div className="flex flex-col">
      <div className="min-h-[100px] border">
        <div className="md:items-start flex flex-col justify-start items-center bg-gray-800 p-5 border-b">
          <span>
            <b>Room ID:</b> {roomid}
          </span>
          <span>
            <b>Count:</b> {roomcount} -
            <span>
              <b> Type:</b> {roomtype}
            </span>
          </span>
        </div>
        <div className="flex justify-between items-center p-5 border-b">
          <b>Refundable</b>
          <span>{Refundable === "false" ? "No" : "Yes"}</span>
        </div>
        <div className="flex justify-between items-center p-5 border-b">
          <b>Description</b>
          <span>{RoomDescription}</span>
        </div>
        <div className="flex-col md:flex-row flex justify-between items-center p-5 border-b">
          <b>Price</b>
          <div className="flex flex-col justify-end">
            <span>
              <b>Total:</b> {RoomPrice.Total.net}(net) /{" "}
              {RoomPrice.Total.rack}(rack)
            </span>
            <span className="mt-2">
              <b>Per Day:</b> {RoomPrice.PerDay.net}(net) /{" "}
              {RoomPrice.PerDay.rack}(rack)
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center p-5 border-b">
          <b>Adult</b>
          <span>{NbAdults}</span>
        </div>
        <div className="flex justify-between items-center p-5 border-b">
          <b>Children</b>
          <span>{NbChildren}</span>
        </div>
      </div>
    </div>
  );
};

export default RoomPlan;