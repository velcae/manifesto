import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActionsOpen, setMobileActionsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getActivePage = () => {
    if (location.pathname.startsWith("/politicians")) {
      return "politicians";
    }
    if (location.pathname.startsWith("/promises")) {
      return "promises";
    }
    if (location.pathname.startsWith("/insights")) {
      return "insights";
    }
    if (location.pathname.startsWith("/reports")) {
      return "reports";
    }
    if (location.pathname.startsWith("/about")) {
      return "about";
    }
    return "dashboard";
  };

  const activePage = getActivePage();

  const handleNavigation = (page) => {
    if (page === "dashboard") {
      navigate("/dashboard");
    } else if (page === "promises") {
      navigate("/promises");
    } else if (page === "insights") {
      navigate("/insights");
    } else if (page === "reports") {
      navigate("/reports");
    } else if (page === "about") {
      navigate("/about");
    }
    setMobileMenuOpen(false);
  };

  const Icon = ({ name, size = 16 }) => {
    const icons = {
      help: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>,
      shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
      close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    };
    return icons[name] || null;
  };

  const styles = `
    .topbar {
      flex: 0 0 auto;
      border-bottom: 1px solid var(--line);
      background: rgba(250, 248, 244, 0.96);
      backdrop-filter: blur(10px);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .topbarInner {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      min-height: 52px;
      padding: 3px 0;
    }
    .logo {
      position: relative;
      z-index: 2;
      flex: 0 0 auto;
      font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.06em;
      line-height: 1;
      color: #171411;
    }
    .nav {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      font-size: 12px;
      line-height: 1.1;
      color: #26221e;
      z-index: 1;
    }
    .nav a, .nav button {
      position: relative;
      padding-bottom: 6px;
      opacity: 0.98;
      font-weight: 600;
      letter-spacing: -0.02em;
      text-transform: capitalize;
      background: transparent;
      border: 0;
      padding: 0;
      color: inherit;
      font: inherit;
      cursor: pointer;
    }
    .nav button.active, .nav a.active { 
      color: var(--accent); 
    }
    .nav button.active::after, .nav a.active::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3px;
      background: var(--accent);
      border-radius: 2px;
    }
    .topActions {
      position: relative;
      z-index: 2;
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .helpBtn, .reportBtn {
      position: relative;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 0 0;
      background: transparent;
      border: 0;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: inherit;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .helpBtn:hover, .reportBtn:hover {
      opacity: 1;
    }
    .reportBadge {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      background: #d35c29;
      color: white;
      border-radius: 2px;
    }
    .mobileMenuBtn {
      display: none;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 8px;
      z-index: 2;
    }
    
    /* Mobile & tablet responsive styles */
    @media (max-width: 1024px) {
      .topbarInner {
        min-height: 48px;
        padding: 8px 0;
        gap: 8px;
      }
      
      .logo {
        font-size: 20px;
      }
      
      .nav {
        display: none;
        position: fixed;
        left: 0;
        top: 48px;
        right: 0;
        flex-direction: column;
        background: white;
        border-bottom: 1px solid var(--line);
        padding: 16px;
        gap: 8px;
        z-index: 50;
        transform: none;
        text-align: left;
      }
      
      .nav.open {
        display: flex;
      }
      
      .nav a, .nav button {
        padding: 12px 16px;
        font-size: 14px;
        width: 100%;
        text-align: left;
        border-radius: 6px;
        transition: background 0.2s;
      }
      
      .nav a:hover, .nav button:hover {
        background: #f0f0f0;
      }
      
      .nav button.active::after, .nav a.active::after {
        display: none;
      }
      
      .nav a.active, .nav button.active {
        background: #efe9df;
        color: var(--accent);
        font-weight: 700;
      }
      
      .mobileMenuBtn {
        display: flex;
        align-items: center;
        order: 2;
        margin-left: auto;
      }
      
      .topActions {
        gap: 0;
        order: 3;
      }

      .logo {
        order: 1;
      }
      
      .helpBtn, .reportBtn {
        font-size: 10px;
        gap: 2px;
        padding: 4px 8px;
      }
      
      .helpBtn span, .reportBtn span {
        display: none;
      }
      
      .helpBtn, .reportBtn {
        padding: 8px;
      }
    }
    
    @media (max-width: 480px) {
      .topbarInner {
        min-height: 44px;
      }
      
      .logo {
        font-size: 18px;
      }
      
      .topActions {
        gap: 0;
      }
      
      .helpBtn, .reportBtn {
        padding: 6px;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <header className="topbar">
        <div className="container topbarInner">
          <div className="logo">Manifesto</div>
          <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
            {['dashboard', 'politicians', 'promises', 'insights', 'reports', 'about'].map((page) => (
              page === 'politicians' ? (
                <Link
                  key={page}
                  to="/politicians"
                  className={activePage === page ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </Link>
              ) : (
                <button
                  key={page}
                  type="button"
                  className={activePage === page ? 'active' : ''}
                  onClick={() => handleNavigation(page)}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </button>
              )
            ))}
          </nav>
          <button 
            className="mobileMenuBtn" 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={20} />
          </button>
          <div className={`topActions ${mobileActionsOpen ? 'visible' : ''}`}>
            <button className="helpBtn" type="button" title="How it works" onClick={() => setMobileActionsOpen(false)}>
              <Icon name="help" size={14} />
              <span>How it works</span>
            </button>
            <button className="reportBtn" type="button" title="Submit Anonymous Report" onClick={() => setMobileActionsOpen(false)}>
              <span className="reportBadge">
                <Icon name="shield" size={11} />
              </span>
              <span>Submit Anonymous Report</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
