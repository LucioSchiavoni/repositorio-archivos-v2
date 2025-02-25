import { useEffect, useState } from "react"
import {formatDistanceToNow} from 'date-fns'
import {es} from 'date-fns/locale'
import { Tooltip } from "@chakra-ui/react";
import {format} from 'date-fns'

const DateFormat = ({ item }: any) => {


    const [relativeTime, setRelativeTime] = useState('');

    const updateRelativeTime = () => {
        const date = new Date(item);
        const formattedDate = formatDistanceToNow(date, {addSuffix: true, locale: es})
        setRelativeTime(formattedDate)
    }

    const fechaFormateada = format(new Date(item), 'yyyy-MM-dd');


    useEffect(() => {
        updateRelativeTime();
        const intervalId = setInterval(updateRelativeTime, 1000)
        return () => clearInterval(intervalId)
    }, [item])

  return (
        <div className=" ">
            <Tooltip fontSize={"medium"} label={fechaFormateada}>
            {relativeTime}
            </Tooltip>
        
        </div>
  )
}

export default DateFormat