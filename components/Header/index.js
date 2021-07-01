import { useState } from 'react';
import Link from 'next/link';

// Icons
import { MenuIcon, XIcon } from '@heroicons/react/solid';

// Data
import links from '../../lib/links';

// Styles
import { variables } from '../../styles/style-variables';

export const siteTitle = 'Next.js Sample Website';

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('/');

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const handleMenuClick = (path) => {
    setCurrentPage(path);
  };

  return (
    <nav className="bg-gray-800">
      <div className={variables.sitePaddingX}>
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {menuIsOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="block h-6 w-6" />
              )}
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </div>

            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {links.map((link) => (
                  <Link href={link.path} key={link.path} passHref>
                    <a
                      href="placeholder"
                      onClick={() => {}}
                      onKeyPress={() => handleMenuClick(link.path)}
                      className={`
                        ${
                          link.path === currentPage
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        } px-3 py-2 rounded-md text-sm font-medium`}
                      aria-current={
                        link.path === currentPage ? 'page' : undefined
                      }
                    >
                      {link.label}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {menuIsOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link, index) => (
              <Link href={link.path} key={index} passHref>
                <a
                  href="placeholder"
                  onClick={() => handleMenuClick(link.path)}
                  className={`
                        ${
                          link.path === currentPage
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        } block px-3 py-2 rounded-md text-base font-medium`}
                  aria-current={link.path === currentPage ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
