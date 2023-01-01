import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Button } from "~/components/Button.tsx";
import Switch from "~/islands/Switch.tsx";

interface Status {
  power: number;
  voltage: number;
  current: number;
}

interface Props {
  deviceId: string;
}

export default function Status({
  deviceId,
}: JSX.HTMLAttributes<HTMLButtonElement> & Props) {
  const [status, setStatus] = useState<Status>({
    power: 0,
    voltage: 0,
    current: 0,
  });

  const reload = () => {
    fetch(`/api/v1.0/${deviceId}/status`)
      .then((a) => a.json())
      .then((a) =>
        a.result
          .filter((r: Record<string, any>) => r.code.match(/cur_/))
          .reduce((accm, r) => ({ ...accm, [r.code.slice(4)]: r.value }), {})
      )
      .then((status) => {
        setStatus(status);
      });
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <>
      <div class="flex gap-1">
        <div>power: {status.power / 10}W</div>
        <div>current: {status.current}mA</div>
        <div>voltage: {status.voltage / 10}V</div>
      </div>

      <div class="mt-4">
        <Switch power="ON" deviceId={deviceId}>
          ONにする
        </Switch>
        <Switch power="OFF" deviceId={deviceId}>
          OFFにする
        </Switch>
        <Button onClick={reload}>リロード</Button>
      </div>
    </>
  );
}
