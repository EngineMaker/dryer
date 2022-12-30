import { Head } from '$fresh/runtime.ts'
import { useState } from 'preact/hooks'
import Switch from '~/islands/Switch.tsx'
import Status from '../islands/Status.tsx'

const Home = () => {
  const [reload, setReload] = useState(true)

  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />

        <Status reload={reload} />
      </div>
    </>
  )
}

export default Home
