import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import XMLParser from "./util/xml-parser";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import SkeletonWrapper from "@/components/custom/SkeletonWrapper"
import NoData from "@/components/custom/NoData"
import { transformXmlData } from "./util/transform";
import PossibilityList from '@/containers/PossibilityList'
import { AccomResponse } from '@/util/transform'


const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Record<string, AccomResponse[]>>();
  const [selectedCity, setSelectedCity] = useState<"GBLON" | "FRMAR">("FRMAR");

  const handleDropdownChange = (value: "GBLON" | "FRMAR") => {
    setSelectedCity(value)
  }

  useEffect(() => {
    setIsLoading(true)
    axios
      .post(
        `/soap-endpoint`,
        {},
        {
          headers: {
            "Content-Type": "application/xml",
          },
        }
      )
      .then((res: any) => {
        const xml = new XMLParser().parseFromString(res.data);
        const transformedData = transformXmlData(xml);
        console.log('transformedData', transformedData);
        setData(transformedData);
      }).finally(() => {
        setIsLoading(false)
      });
  }, []);

  if (isLoading) return <SkeletonWrapper />
  const cityData = data ? data[selectedCity] : null

  console.log('cityData', cityData)

  return (
    <div className="min-h-screen md:container text-xs md:text-sm">
      <div className="flex flex-col items-center justify-center">
        <Select value={selectedCity} onValueChange={handleDropdownChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="font-bold">City</SelectLabel>
              <SelectItem value="GBLON">GBLON</SelectItem>
              <SelectItem value="FRMAR">FRMAR</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {cityData ? cityData.map((datum, index) => {
          const { PossibilitiesList, Name } = datum;
          return <div key={index} className="flex flex-col items-center mt-10 min-w-full">
            <div>{Name} </div>
            <PossibilityList data={PossibilitiesList} />
          </div>
        }) : <NoData />}
      </div>
    </div>
  );
}

export default App;
