import { useState, useEffect, useCallback } from 'preact/hooks'
import { Button } from '../components/Button.tsx'
import Switch from './Switch.tsx'

interface Status {
  power: number
  voltage: number
  current: number
}

export default function Status(props) {
  const [status, setStatus] = useState<Status>({
    power: 0,
    voltage: 0,
    current: 0,
  })

  const reload = () => {
    fetch('/api/v1.0/72363820c4dd5703cd72/status')
      .then((a) => a.json())
      .then((a) =>
        a.result
          .filter((r: Record<string, any>) => r.code.match(/cur_/))
          .reduce((accm, r) => ({ ...accm, [r.code.slice(4)]: r.value }), {})
      )
      .then((status) => {
        setStatus(status)
      })
  }

  useEffect(() => {
    reload()
  }, [])

  return (
    <>
      <div class="flex gap-1">
        <div>power: {status.power}W</div>
        <div>current: {status.current}mA</div>
        <div>voltage: {status.voltage}V</div>
      </div>

      <div class="mt-4">
        <Switch power="ON">ONにする</Switch>
        <Switch power="OFF">OFFにする</Switch>
        <Button onClick={reload}>リロード</Button>
      </div>
    </>
  )
}
