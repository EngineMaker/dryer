import ChartJS from "https://esm.sh/chart.js@4.1.1/auto"
import format from "date-fns-tz/format"
import { useCallback, useEffect, useRef, useState } from "preact/hooks"

interface Props {
  deviceId: string
}

const Chart = (props: Props) => {
  const [data, setData] = useState([])
  const el = useRef<HTMLCanvasElement>(null)

  const loadHistory = useCallback(async () => {
    const histories = await fetch(`/api/v1.0/${props.deviceId}/history`).then(
      (r) => r.json()
    )

    setData(histories.reverse().map((h) => ({ ...h, time: new Date(h.time) })))
  }, [])

  useEffect(() => {
    loadHistory()
  }, [])

  useEffect(() => {
    console.log(data)
    if (el.current && data.length > 0) {
      new ChartJS(el.current, {
        type: "line",
        data: {
          labels: data.map((d) =>
            format(d.time, "HH:mm", { timeZone: "Asia/Tokyo" })
          ),
          datasets: [
            { label: "Power", data: data.map((d) => d.power), fill: true },
          ],
        },
      })
    }
  }, [data])

  return (
    <div>
      <canvas ref={el} />
    </div>
  )
}

export default Chart
