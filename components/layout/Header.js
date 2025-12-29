import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="site-header">
      <nav className="navbar bg-white">
        <div className="container d-flex align-items-center justify-content-between">

          {/* BRAND LOGO */}
          <Link href="/" aria-label="Home">
            <Image
              src="/logo.png"
              alt="SIVAAH"
              width={120}
              height={40}
              priority
            />
          </Link>

          {/* ICONS */}
          <div className="d-flex align-items-center gap-4 header-icons">

            {/* SHOP ICON */}
            <Link href="/shop" aria-label="Shop">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l1-5h16l1 5" />
                <path d="M5 22V9" />
                <path d="M19 22V9" />
                <path d="M9 22V14h6v8" />
              </svg>
            </Link>

            {/* CART ICON */}
            <Link href="/cart" aria-label="Cart">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>
            </Link>

          </div>
        </div>
      </nav>
    </header>
  );
}
