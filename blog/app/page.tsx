import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        此外何求
      </h1>
      <p className="mb-4 font-semibold tracking-tighter">
        {`一个喜欢写写代码的人`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
