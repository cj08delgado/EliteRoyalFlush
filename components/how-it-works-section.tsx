const STEPS = [
  {
    step: '1',
    title: 'Make a Deposit',
    description: 'Tell us about your event and restroom needs. It only takes a minute.',
  },
  {
    step: '2',
    title: 'We Handle the Details',
    description: 'Elite Royal Flush delivers and sets up the restroom at your location.',
  },
  {
    step: '3',
    title: 'Enjoy Your Event',
    description: 'We take care of pickup after the event, so you can focus on celebrating.',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">How It Works</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-balance md:text-5xl">
          Simple from start to finish
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
          Booking luxury restrooms should be effortless. Here&apos;s all it takes.
        </p>
      </div>

      <ol className="mt-14 grid gap-8 md:grid-cols-3">
        {STEPS.map((item) => (
          <li key={item.step} className="relative text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full border-2 border-gold/50 bg-gold/10 font-serif text-2xl font-semibold text-gold">
              {item.step}
            </div>
            <h3 className="mt-5 font-serif text-xl font-semibold">{item.title}</h3>
            <p className="mx-auto mt-2.5 max-w-xs leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-14 text-center">
        <a
          href="#deposit"
          className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-base font-semibold text-gold-foreground transition-transform hover:scale-[1.03]"
        >
          Make a Deposit
        </a>
      </div>
    </section>
  )
}
