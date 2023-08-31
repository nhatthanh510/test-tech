import { PossibilitiesItem } from '@/util/transform'
import Possibilities from './Possibilities'

const PossibilityList: React.FC<{
  data: PossibilitiesItem[]
}> = ({ data }) => {
  return (
    <div className="flex flex-col items-center min-w-full">
      {data.map((item, index) => <Possibilities {...item} key={index} />)}
    </div>
  );
};

export default PossibilityList