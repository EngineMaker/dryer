import { JSX } from 'preact'
import { useCallback } from 'preact/hooks'
import { Button } from '~/components/Button.tsx'

interface Props {
  power: 'ON' | 'OFF'
}

export default function Switch({
  children,
  power,
}: JSX.HTMLAttributes<HTMLButtonElement> & Props) {
  const turnOn = useCallback(() => {
    fetch('/api/v1.0/72363820c4dd5703cd72/command', {
      method: 'POST',
      body: JSON.stringify({
        code: 'switch_1',
        value: power === 'ON' ? true : false,
      }),
    })
  }, [])

  return <Button onClick={() => turnOn()}>{children}</Button>
}
