import { createStore } from "solid-js/store";
import { getData, req } from "~/lib/utils";

export default function Home() {
  const [data, setData] = createStore()

  return (
    <main class="mx-auto text-gray-700 p-4">
      <form
        class="flex flex-col gap-3 max-w-xl"
        onSubmit={async (e) => {
          e.preventDefault()
          // @ts-ignore
          const data = new FormData(e.target)
          const formObject = Object.fromEntries(data.entries()) as req
          console.log(formObject)

          const comparators = await getData(formObject)   
          setData(comparators)
        }}
        method="post"
      >
        <input class="border" value="3" type="text" name="duration" placeholder="duration" />
        <input class="border" value="2000-01-01" type="date" name="birthday" placeholder="date of birht" />
        <button type="submit" > submit </button>
      </form>
      <pre>
        { JSON.stringify(data, null, 2) }
      </pre>
    </main>
  );
}
