import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from 'axios'
import "./App.css";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";


const DialogDemo = () => {
  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type RoomPlanProps = {
  item: RoomPlanItem;
};

const RoomPlan: React.FC<RoomPlanProps> = ({ item }) => {
  return (
    <div className="flex flex-col">
      <div className="min-h-[100px] border">
        <div className="flex flex-col justify-start items-start bg-gray-800 p-5 border-b">
          <span>
            <b>Room ID:</b> {item._roomid}
          </span>
          <span>
            <b>Count:</b> {item._roomcount} -
            <span>
              <b> Type:</b> {item._roomtype}
            </span>
          </span>
        </div>
        <div className="flex justify-between items-center p-5 border-b">
          <b>Refundable</b>
          <span>{item.Refundable === "false" ? "No" : "Yes"}</span>
        </div>
        <div className="flex justify-between items-center p-5 border-b">
          <b>Description</b>
          <span>{item.RoomDescription}</span>
        </div>
        <div className="flex justify-between items-center p-5 border-b">
          <b>Price</b>
          <div className="flex flex-col justify-end">
            <span>
              <b>Total:</b> {item.RoomPrice.Total._net}(net) /{" "}
              {item.RoomPrice.Total._rack}(rack)
            </span>
            <span className="mt-2">
              <b>Per Day:</b> {item.RoomPrice.PerDay._net}(net) /{" "}
              {item.RoomPrice.PerDay._rack}(rack)
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center p-5 border-b">
          <b>Adult</b>
          <span>{item.NbAdults}</span>
        </div>
        <div className="flex justify-between items-center p-5 border-b">
          <b>Children</b>
          <span>{item.NbChildren}</span>
        </div>
      </div>
    </div>
  );
};

type RoomPlanItem = {
  Refundable: string;
  RoomDescription: string;
  RoomPrice: {
    Total: {
      _net: string;
      _rack: string;
    };
    PerDay: {
      _net: string;
      _rack: string;
    };
  };
  NbAdults: string;
  NbChildren: string;
  NbCot: string;
  Board: {
    Included: {
      Adult: {
        _code: string;
        _type: string;
        __text: string;
      };
      Child?: {
        _code: string;
        _type: string;
        __text: string;
      };
    };
  };
  _roomid: string;
  _roomcount: string;
  _roomtype: string;
};

type PossibilityItem = {
  _suppliercode: string;
  _onrequest: string;
  _supplieraccomcode: string;
  _currency: string;
  _totalPriceNet: number;
  _totalPriceRack: number;
  _roomPlans: RoomPlanItem[];
};

type PossibilityProps = {
  item: PossibilityItem;
};

const Possibility: React.FC<PossibilityProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderRoomPlan = useCallback(() => {
    return item._roomPlans.map((roomPlan) => <RoomPlan item={roomPlan} />);
  }, [item]);

  return (
    <div className="mt-10 flex justify-center w-full">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="space-y-2 w-full"
      >
        <CollapsibleTrigger asChild>
          <div className="flex border-white items-center border-[0.5px] pr-2">
            <div className="h-[50px] flex flex-1 items-center justify-between p-5 ">
              <span>
                {item._suppliercode} ({item._supplieraccomcode})
              </span>
              <span className="pointer-events-none">
                <b>Price:</b> {item._totalPriceNet} {item._currency}
              </span>
            </div>
            <ChevronsUpDown className="w-[30px] h-[30px]" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 h-[500px] overflow-scroll">
          {renderRoomPlan()}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

const defaultPossibilities: PossibilityItem[] = [
  {
    _suppliercode: "SNH",
    _onrequest: "false",
    _supplieraccomcode: "012B3334363331K",
    _currency: "EUR",
    _totalPriceNet: 422.0,
    _totalPriceRack: 527.5,
    _roomPlans: [
      {
        Refundable: "false",
        RoomDescription: "Double room - Executive",
        RoomPrice: {
          Total: {
            _net: "211.0",
            _rack: "263.75",
          },
          PerDay: {
            _net: "211.0",
            _rack: "263.75",
          },
        },
        NbAdults: "2",
        NbChildren: "0",
        NbCot: "0",
        Board: {
          Included: {
            Adult: {
              _code: "RO",
              _type: "RO",
              __text: "No meals",
            },
          },
        },
        _roomid: "1693415515809/595.1440516311554-30635-70376325-1-0",
        _roomcount: "1",
        _roomtype: "DB",
      },
      {
        Refundable: "false",
        RoomDescription: "Double room - Executive",
        RoomPrice: {
          Total: {
            _net: "211.0",
            _rack: "263.75",
          },
          PerDay: {
            _net: "211.0",
            _rack: "263.75",
          },
        },
        NbAdults: "1",
        NbChildren: "1",
        NbCot: "0",
        Board: {
          Included: {
            Adult: {
              _code: "RO",
              _type: "RO",
              __text: "No meals",
            },
            Child: {
              _code: "RO",
              _type: "RO",
              __text: "No meals",
            },
          },
        },
        _roomid: "1693415515809/319.491300343539-30635-70376325-1-1",
        _roomcount: "1",
        _roomtype: "DB",
      },
    ],
  },
  {
    _suppliercode: "A2B",
    _onrequest: "false",
    _supplieraccomcode: "02315435498684D",
    _currency: "EUR",
    _totalPriceNet: 452.0,
    _totalPriceRack: 627.5,
    _roomPlans: [
      {
        Refundable: "false",
        RoomDescription: "Family room - Classic",
        RoomPrice: {
          Total: {
            _net: "211.0",
            _rack: "263.75",
          },
          PerDay: {
            _net: "211.0",
            _rack: "263.75",
          },
        },
        NbAdults: "2",
        NbChildren: "0",
        NbCot: "0",
        Board: {
          Included: {
            Adult: {
              _code: "RO",
              _type: "RO",
              __text: "No meals",
            },
          },
        },
        _roomid: "1693415515809/702.0515807904328-30635-70922924-1-0",
        _roomcount: "1",
        _roomtype: "DB",
      },
      {
        Refundable: "false",
        RoomDescription: "Family room - Classic",
        RoomPrice: {
          Total: {
            _net: "211.0",
            _rack: "263.75",
          },
          PerDay: {
            _net: "211.0",
            _rack: "263.75",
          },
        },
        NbAdults: "1",
        NbChildren: "1",
        NbCot: "0",
        Board: {
          Included: {
            Adult: {
              _code: "RO",
              _type: "RO",
              __text: "No meals",
            },
            Child: {
              _code: "RO",
              _type: "RO",
              __text: "No meals",
            },
          },
        },
        _roomid: "1693415515809/721.3646725111988-30635-70922924-1-1",
        _roomcount: "1",
        _roomtype: "DB",
      },
    ],
  },
  {
    _suppliercode: "DYN",
    _onrequest: "false",
    _supplieraccomcode: "05435453243244X",
    _currency: "EUR",
    _totalPriceNet: 322.0,
    _totalPriceRack: 327.5,
    _roomPlans: [
      {
        Refundable: "false",
        RoomDescription: "Double room - Executive",
        RoomPrice: {
          Total: {
            _net: "211.0",
            _rack: "263.75",
          },
          PerDay: {
            _net: "211.0",
            _rack: "263.75",
          },
        },
        NbAdults: "2",
        NbChildren: "0",
        NbCot: "0",
        Board: {
          Included: {
            Adult: {
              _code: "RO",
              _type: "RO",
              __text: "No meals",
            },
          },
        },
        _roomid: "1693415515809/595.1440516311554-30635-70376325-1-0",
        _roomcount: "1",
        _roomtype: "DB",
      },
      {
        Refundable: "false",
        RoomDescription: "Double room - Executive",
        RoomPrice: {
          Total: {
            _net: "211.0",
            _rack: "263.75",
          },
          PerDay: {
            _net: "211.0",
            _rack: "263.75",
          },
        },
        NbAdults: "1",
        NbChildren: "1",
        NbCot: "0",
        Board: {
          Included: {
            Adult: {
              _code: "RO",
              _type: "RO",
              __text: "No meals",
            },
            Child: {
              _code: "RO",
              _type: "RO",
              __text: "No meals",
            },
          },
        },
        _roomid: "1693415515809/319.491300343539-30635-70376325-1-1",
        _roomcount: "1",
        _roomtype: "DB",
      },
    ],
  },
  {
    _suppliercode: "XNE",
    _onrequest: "false",
    _supplieraccomcode: "06767657657643F",
    _currency: "EUR",
    _totalPriceNet: 222.0,
    _totalPriceRack: 727.5,
    _roomPlans: [
      {
        Refundable: "false",
        RoomDescription: "Family room - Classic",
        RoomPrice: {
          Total: {
            _net: "211.0",
            _rack: "263.75",
          },
          PerDay: {
            _net: "211.0",
            _rack: "263.75",
          },
        },
        NbAdults: "2",
        NbChildren: "0",
        NbCot: "0",
        Board: {
          Included: {
            Adult: {
              _code: "RO",
              _type: "RO",
              __text: "No meals",
            },
          },
        },
        _roomid: "1693415515809/702.0515807904328-30635-70922924-1-0",
        _roomcount: "1",
        _roomtype: "DB",
      },
      {
        Refundable: "false",
        RoomDescription: "Family room - Classic",
        RoomPrice: {
          Total: {
            _net: "211.0",
            _rack: "263.75",
          },
          PerDay: {
            _net: "211.0",
            _rack: "263.75",
          },
        },
        NbAdults: "1",
        NbChildren: "1",
        NbCot: "0",
        Board: {
          Included: {
            Adult: {
              _code: "RO",
              _type: "RO",
              __text: "No meals",
            },
            Child: {
              _code: "RO",
              _type: "RO",
              __text: "No meals",
            },
          },
        },
        _roomid: "1693415515809/721.3646725111988-30635-70922924-1-1",
        _roomcount: "1",
        _roomtype: "DB",
      },
    ],
  },
];

function App() {
  useEffect(() => {
    axios.post(`/soap-endpoint`, {}, {
      headers: {
        'Content-Type': 'application/xml',
      },
    }).then(res => {
      console.log('res', res)
      const parser = new Parser({ explicitArray: false });
      parser.parseString(res.data, (error, result) => {
        if (error) {
          console.error(error);
        } else {
          const jsonData = result['soapenv:Envelope']['soapenv:Body'];
          console.log('jsonData', jsonData)
        }
      });
    })
  })
  const [possibilities] = useState(defaultPossibilities);

  const renderPossibility = useCallback(() => {
    return possibilities.map((item) => <Possibility item={item} />);
  }, [possibilities]);

  return (
    <div className="min-h-screen md:container text-xs md:text-sm">
      <div className="flex flex-col items-center justify-center">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="font-bold">City</SelectLabel>
              <SelectItem value="GBLON">GBLON</SelectItem>
              <SelectItem value="FRPAR">FRPAR</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex flex-col items-center mt-10 min-w-full">
          {renderPossibility()}
        </div>
      </div>
    </div>
  );
}

export default App;
