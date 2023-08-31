import { Terminal } from "lucide-react"

import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"

const NoData = () => {
  return (
    <div className="mt-10">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>No data</AlertTitle>
      </Alert>
    </div>

  )
}

export default NoData