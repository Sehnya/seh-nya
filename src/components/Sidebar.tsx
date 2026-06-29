import { useState, useEffect, useCallback, useRef } from "react";
import { Home, Music, User, ShoppingBag, Mail, Share2 } from "lucide-react";

interface SubMenuItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  subItems?: SubMenuItem[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    icon: <Home size={18} />,
    href: "#",
  },
  {
    label: "Music",
    icon: <Music size={18} />,
    href: "#music",
    subItems: [
      { label: "Singles", href: "#singles" },
      { label: "EPs", href: "#eps" },
      { label: "Albums", href: "#albums" },
    ],
  },
  {
    label: "About",
    icon: <User size={18} />,
    href: "#about",
    subItems: [
      { label: "Bio", href: "#bio" },
      { label: "Press Kit", href: "#press-kit" },
    ],
  },
  {
    label: "Merch",
    icon: <ShoppingBag size={18} />,
    href: "#merch",
    subItems: [
      { label: "Apparel", href: "#apparel" },
      { label: "Accessories", href: "#accessories" },
    ],
  },
  {
    label: "Contact",
    icon: <Mail size={18} />,
    href: "#contact",
    subItems: [
      { label: "Booking", href: "#booking" },
      { label: "Management", href: "#management" },
    ],
  },
  {
    label: "Socials",
    icon: <Share2 size={18} />,
    href: "#socials",
    subItems: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Twitter", href: "https://twitter.com" },
      { label: "Spotify", href: "https://spotify.com" },
      { label: "Apple Music", href: "https://music.apple.com" },
    ],
  },
];

export default function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show sidebar when mouse approaches left edge
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX <= 20) {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
        setIsVisible(true);
      } else if (e.clientX > 280) {
        // Only hide if not hovering over sidebar itself
        if (!sidebarRef.current?.contains(e.target as Node)) {
          hideTimeoutRef.current = setTimeout(() => setIsVisible(false), 300);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      setHoveredItem(null);
    }, 400);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  return (
    <>
      {/* Invisible trigger zone */}
      <div className="sidebar-trigger" />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`sidebar-container ${isVisible ? "visible" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <nav className="h-full flex flex-col justify-center px-4 py-8" style={{ background: "var(--ink-bg)" }}>
          {/* Logo */}
          <div className="mb-8 px-3">
            <span className="text-lg font-bold tracking-tight" style={{ color: "var(--ink-light)" }}>
              S
            </span>
          </div>

          {/* Nav items */}
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item, index) => (
              <li
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <a
                  href={item.href}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    activeIndex === index
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                  }`}
                  style={{ color: activeIndex === index ? "var(--ink-light)" : "var(--ink-mid)" }}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </a>

                {/* Sub-menu flyout */}
                {item.subItems && hoveredItem === index && (
                  <div
                    className="absolute left-full top-0 ml-2 py-2 px-1 rounded-lg min-w-[140px] shadow-xl border"
                    style={{
                      background: "var(--ink-bg)",
                      borderColor: "var(--ink-dark)",
                    }}
                  >
                    {item.subItems.map((sub, subIndex) => (
                      <a
                        key={subIndex}
                        href={sub.href}
                        className="block px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-white/10"
                        style={{ color: "var(--ink-mid)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-light)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-mid)")}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
