import React from 'react';
import { DesktopNavbar } from './DesktopNavbar';
import { MobileNavbar } from './MobileNavbar';

/**
 * Navbar
 *
 * Composition root only — holds no shared state and contains no
 * responsive logic of its own. It mounts DesktopNavbar and MobileNavbar
 * side by side and lets Tailwind's `lg:` breakpoint decide which one is
 * visible (`hidden lg:flex` on desktop, `lg:hidden` on mobile).
 *
 * Both are always mounted so server and client render the same DOM
 * (no hydration mismatch from viewport-based conditional rendering).
 * Since neither component reads from or writes to the other, editing
 * one can never change the other's behavior.
 */
export function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
      {/* Spacer matching the fixed header's height so page content never sits underneath it. */}
      <div aria-hidden="true" className="h-[68px] lg:h-[92px]" />
    </>
  );
}

export default Navbar;
