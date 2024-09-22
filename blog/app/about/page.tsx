
import Image from 'next/image';

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        <Image
          src="/images/whatelsedoyouseek.png"
          alt="Alt Text"
          width={500}
          height={300}
        />
      </h1>
      <p className="mb-4 font-semibold tracking-tighter">
        {`一个喜欢写写代码的人`}
      </p>
      <p className="mb-4 tracking-tighter">
        contact: mentalwz at gmail dot com
      </p>
      <div className="my-8">
      </div>
    </section>
  )
}
