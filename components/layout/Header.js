import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) return;

    window.location.href =
      `/shop?search=${encodeURIComponent(value)}`;
  };

  return (
    <>
      {/* =====================================================
          ANNOUNCEMENT BAR
      ===================================================== */}

      <div className="sivaah-announcement">
        <span>925 STERLING SILVER</span>
        <span className="announcement-dot">•</span>
        <span>REAL PRODUCT WEIGHTS</span>
        <span className="announcement-dot">•</span>
        <span>TRANSPARENT PRICING</span>
      </div>


      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sivaah-header">

        <div className="sivaah-header-inner">

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            className="header-icon-button mobile-menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>


          {/* LOGO */}

          <Link
            href="/"
            className="sivaah-logo-link"
            aria-label="SIVAAH Home"
             reloadDocument
          >
            <Image
              src="/logo.png"
              alt="SIVAAH 925 Fine Silver Jewels"
              width={130}
              height={50}
              priority
              className="sivaah-logo"
            />
          </Link>


          {/* DESKTOP NAVIGATION */}

          <nav className="sivaah-main-nav">

            <Link href="/shop"  reloadDocument>
              Shop
            </Link>

            <Link href="/collections/rings"  reloadDocument>
              Rings
            </Link>

            <Link href="/collections/earrings"  reloadDocument>
              Earrings
            </Link>

            <Link href="/collections/pendants"  reloadDocument>
              Pendants
            </Link>

            <Link href="/collections/bracelets"  reloadDocument>
              Bracelets
            </Link>

            <Link href="/collections/anklets"  reloadDocument>
              Anklets
            </Link>

            <Link href="/gifts"  reloadDocument>
              Gifts
            </Link>

          </nav>


          {/* RIGHT SIDE ACTIONS */}

          <div className="sivaah-header-actions">

            {/* SEARCH */}

            <button
              type="button"
              className="header-icon-button"
              onClick={() =>
                setSearchOpen(!searchOpen)
              }
              aria-label="Search"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                />

                <line
                  x1="16"
                  y1="16"
                  x2="21"
                  y2="21"
                />
              </svg>
            </button>


            {/* ACCOUNT */}

            <Link
              href="/account"
              className="header-icon-button desktop-account"
              aria-label="Account"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="3.5"
                />

                <path
                  d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6"
                />
              </svg>
            </Link>


            {/* CART */}

            <Link
              href="/cart"
              className="header-cart-button"
              aria-label="Cart"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="9"
                  cy="21"
                  r="1"
                />

                <circle
                  cx="20"
                  cy="21"
                  r="1"
                />

                <path
                  d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"
                />
              </svg>
            </Link>

          </div>

        </div>


        {/* =====================================================
            SEARCH PANEL
        ===================================================== */}

        {searchOpen && (

          <div className="header-search-panel">

            <form
              onSubmit={handleSearch}
              className="header-search-form"
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                />

                <line
                  x1="16"
                  y1="16"
                  x2="21"
                  y2="21"
                />
              </svg>


              <input
                type="search"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search silver jewellery..."
                autoFocus
              />


              <button type="submit">
                SEARCH
              </button>

            </form>

          </div>

        )}

      </header>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {menuOpen && (

        <div
          className="mobile-menu-overlay"
          onClick={() => setMenuOpen(false)}
        >

          <aside
            className="mobile-menu"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MENU HEADER */}

            <div className="mobile-menu-header">

              <span>
                SIVAAH
              </span>

              <button
                type="button"
                onClick={() =>
                  setMenuOpen(false)
                }
                aria-label="Close menu"
              >
                ×
              </button>

            </div>


            {/* MENU LINKS */}

            <nav className="mobile-menu-nav">

              <Link
                href="/shop"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Shop All
              </Link>

              <Link
                href="/collections/rings"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Rings
              </Link>

              <Link
                href="/collections/earrings"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Earrings
              </Link>

              <Link
                href="/collections/pendants"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Pendants
              </Link>

              <Link
                href="/collections/bracelets"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Bracelets
              </Link>

              <Link
                href="/collections/anklets"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Anklets
              </Link>

              <Link
                href="/gifts"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Gifts
              </Link>

            </nav>


            {/* MENU FOOTER */}

            <div className="mobile-menu-footer">

              <Link
                href="/about"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                About Sivaah
              </Link>

              <Link
                href="/contact"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Contact
              </Link>

              <Link
                href="/cart"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Cart
              </Link>

            </div>

          </aside>

        </div>

      )}

    </>
  );
}