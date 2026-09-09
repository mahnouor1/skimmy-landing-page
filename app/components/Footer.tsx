export default function Footer() {
  return (
    <footer className="bg-[#0F0F0F] px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#B58E31] flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 10V7a4.5 4.5 0 0 1 9 0v3" stroke="white" strokeWidth="1.3" strokeLinecap="round"/><circle cx="6.5" cy="10.5" r="1.2" fill="white"/></svg>
          </div>
          <span className="font-semibold text-white text-[14px]">Skimmy</span>
        </div>
        <div className="flex flex-wrap gap-6">
          {[["Product","#capabilities"],["Use Cases","#use-cases"],["Integrations","#integrations"],["Demo","#demo"],["Contact","mailto:hello@skimmy.ai"],["Privacy","#"],["Terms","#"]].map(([label, href]) => (
            <a key={label} href={href} className="text-[13px] text-[#6B6B6B] hover:text-white transition-colors">{label}</a>
          ))}
        </div>
        <p className="text-[12px] text-[#444]">© {new Date().getFullYear()} Skimmy</p>
      </div>
    </footer>
  );
}
