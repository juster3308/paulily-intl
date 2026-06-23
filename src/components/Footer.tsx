import { seriesList } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-p-black text-white/70 py-[clamp(48px,6vw,80px)] px-[clamp(24px,4vw,80px)]">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 max-w-[1200px] mx-auto pb-10 border-b border-white/[0.08]">
        {/* Brand */}
        <div>
          <div className="font-serif text-[1.25rem] tracking-brand font-medium text-white mb-4">
            P A U L I L Y
          </div>
          <p className="font-accent text-sm font-light italic text-white/50 leading-[1.7] max-w-[280px]">
            Crafted for the discerning. Where Eastern artistry meets uncompromising quality.
          </p>
        </div>

        {/* Collection */}
        <div>
          <div className="font-sans text-[0.625rem] tracking-wide uppercase text-p-gold font-medium mb-5">
            Collection
          </div>
          <ul className="list-none flex flex-col gap-3">
            {seriesList.map((s) => (
              <li key={s.id}>
                <a href="#collection" className="font-sans text-[0.8125rem] text-white/50 no-underline transition-colors duration-300 hover:text-p-gold">
                  {s.nameEn}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <div className="font-sans text-[0.625rem] tracking-wide uppercase text-p-gold font-medium mb-5">
            Company
          </div>
          <ul className="list-none flex flex-col gap-3">
            {['Heritage', 'Craftsmanship', 'Wholesale', 'Press'].map((item) => (
              <li key={item}>
                <a href="#" className="font-sans text-[0.8125rem] text-white/50 no-underline transition-colors duration-300 hover:text-p-gold">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <div className="font-sans text-[0.625rem] tracking-wide uppercase text-p-gold font-medium mb-5">
            Connect
          </div>
          <ul className="list-none flex flex-col gap-3">
            <li>
              <a href="mailto:wholesale@paulily.com" className="font-sans text-[0.8125rem] text-white/50 no-underline transition-colors duration-300 hover:text-p-gold">
                wholesale@paulily.com
              </a>
            </li>
            <li className="font-sans text-[0.8125rem] text-white/50">
              +86 21 6888 XXXX
            </li>
            <li className="font-sans text-[0.8125rem] text-white/50">
              Shanghai, China
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[1200px] mx-auto pt-8 
        font-sans text-[0.6875rem] text-white/30 gap-4 md:gap-0">
        <span>© 2026 PAULILY. All rights reserved.</span>
        <div className="flex gap-4">
          {[
            { label: 'Ig', title: 'Instagram' },
            { label: 'Li', title: 'LinkedIn' },
            { label: 'Wx', title: 'WeChat' },
          ].map((social) => (
            <a key={social.title} href="#" title={social.title}
              className="w-9 h-9 border border-white/[0.1] flex items-center justify-center 
                text-white/40 text-xs no-underline transition-all duration-300 
                hover:border-p-gold hover:text-p-gold">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}