export default function PageSkeleton() {
  return (
    <div aria-busy="true" className="container-page pt-40 pb-24">
      <div className="skeleton h-6 w-40 rounded-full" />
      <div className="skeleton mt-6 h-14 w-3/4 rounded-2xl" />
      <div className="skeleton mt-4 h-5 w-1/2 rounded-full" />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[0, 1, 2].map((i) => <div key={i} className="skeleton h-72 rounded-[1.75rem]" />)}
      </div>
    </div>
  )
}
