export default function FinalCTA() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-[#F7F6F3] border-t border-[#E8E4DC]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-tight text-[#0F0F0F] mb-5">
          Give your business a voice that never misses the call.
        </h2>
        <p className="text-[16px] text-[#6B6B6B] mb-8 max-w-md mx-auto">Every unanswered call is a missed opportunity. Skimmy handles them all.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="mailto:hello@skimmy.ai" className="px-7 py-3.5 rounded-md bg-[#B58E31] text-white font-medium text-[15px] hover:bg-[#8B6B1E] transition-colors">Book a Demo</a>
          <a href="#demo" className="px-7 py-3.5 rounded-md border border-[#E8E4DC] text-[#2C2C2C] font-medium text-[15px] hover:border-[#B58E31] hover:text-[#B58E31] transition-colors">Watch Demo</a>
        </div>
      </div>
    </section>
  );
}
