export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <a href="#" className="logo foot-brand" aria-label="Quontive">
          <svg viewBox="0 0 104 104" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" shapeRendering="geometricPrecision">
            <defs>
              <mask id="q-cut-f">
                <rect width="104" height="104" fill="#fff" />
                <polygon points="40,58 73,58 133,118 100,118" fill="#000" />
              </mask>
            </defs>
            <circle cx="52" cy="52" r="43" fill="none" stroke="currentColor" strokeWidth="14" mask="url(#q-cut-f)" />
            <polygon points="48,66 65,66 101,100 84,100" fill="currentColor" />
          </svg>
          <span>Quontive</span>
        </a>
        <div className="foot-links">
          {/* TODO: /gizlilik-politikasi ve /kvkk sayfaları yayınlanınca linkler geri eklenecek. */}
        </div>
        <span>© 2026 Quontive. Tüm hakları saklıdır.</span>
      </div>
    </footer>
  );
}
