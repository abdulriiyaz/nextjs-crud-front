import { AddATodo } from "@/components/add-a-todo"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-full w-full flex-row border">
          <div className="add h-full w-full">
            <AddATodo />
          </div>
          <div className="table"></div>
        </div>
      </div>
    </section>
  )
}
