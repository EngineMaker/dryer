import { Head } from '$fresh/runtime.ts'
import Status from '~/islands/Status.tsx'
import Chart from "../islands/Chart.tsx"

const Home = () => {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-xl md:text-3xl mt-2 mb-6">
          EngineMaker新宿の乾燥機を監視する
        </h1>
        <div class="flex flex-col gap-8">
          <div>
            <img
              src="/surculator.jpg"
              class="w-32"
              alt="the fresh logo: a sliced lemon dripping with juice"
            />

            <Status deviceId="72363820c4dd5703cd72" />
            <Chart deviceId="72363820c4dd5703cd72"></Chart>
          </div>

          <div>
            <img
              src="/water-boiler.jpg"
              class="w-32"
              alt="the fresh logo: a sliced lemon dripping with juice"
            />
            <Status deviceId="72363820c4dd5707cd6a" />
            <Chart deviceId="72363820c4dd5707cd6a"></Chart>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
