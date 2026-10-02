export default function Footer() {
  return (
    <footer className="border-t border-dark-700 bg-dark-900 pt-12 pb-6 sm:pt-16 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-8 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-lg font-bold text-white mb-3">
              <span className="text-gradient">Tribal 3</span>
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Premium digital experiences crafted with cutting-edge technology. We transform your vision into reality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-1 sm:space-y-2">
              {["Services", "About", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="flex min-h-10 items-center text-sm text-gray-500 transition-colors hover:text-cyan-400">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Services</h4>
            <ul className="space-y-1 sm:space-y-2">
              {["MERN Stack", "Graphics Design", "AI Integration", "Shopify", "WordPress"].map((s) => (
                <li key={s}>
                  <span className="flex min-h-10 items-center text-sm text-gray-500">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 min-w-0 sm:col-span-1">
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Get In Touch</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><span className="flex min-h-10 items-center break-all text-sm text-gray-500">tribal3tech@gmail.com</span></li>
              <li><span className="flex min-h-10 items-center text-sm text-gray-500">Pakistan</span></li>
              <li className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                {["Twitter", "LinkedIn", "GitHub"].map((s) => (
                  <a key={s} href="#" className="flex min-h-10 items-center text-sm text-gray-500 transition-colors hover:text-cyan-400">{s}</a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-dark-700 pt-5 sm:flex-row sm:gap-4 sm:pt-6">
          <p className="text-center text-xs text-gray-600 sm:text-left">
            &copy; {new Date().getFullYear()} Tribal 3. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-gray-600 sm:justify-end">
            <a href="#" className="flex min-h-10 items-center transition-colors hover:text-cyan-400">Privacy Policy</a>
            <a href="#" className="flex min-h-10 items-center transition-colors hover:text-cyan-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
