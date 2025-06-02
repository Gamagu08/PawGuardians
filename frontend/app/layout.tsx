import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: "🐱 PawGuardians 🐶 - Decentralized Animal Support",
  description: "Stray animal support platform powered by Stellar & Soroban blockchain technology. Transparent donations, real-time tracking and decentralized management.",
  keywords: [
    "blockchain", 
    "stellar", 
    "soroban", 
    "animal rights", 
    "donation", 
    "decentralized",
    "stray animals",
    "cat",
    "dog",
    "animal welfare",
    "crypto donation",
    "transparent donation"
  ].join(", "),
  authors: [
    { name: "PawGuardians Team", url: "https://pawguardians.com" }
  ],
  creator: "PawGuardians Team",
  publisher: "PawGuardians Platform",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pawguardians.com',
    title: '🐱 PawGuardians 🐶 - Animal Support with Blockchain',
    description: 'Transparent and reliable stray animal support platform on Stellar blockchain',
    siteName: 'PawGuardians',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PawGuardians - Blockchain Animal Support Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🐱 PawGuardians 🐶 - Blockchain Animal Support',
    description: 'Transparent stray animal support platform with Stellar blockchain',
    images: ['/twitter-image.jpg'],
    creator: '@pawguardians',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#8b5cf6',
      },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://pawguardians.com',
    languages: {
      'en-US': 'https://pawguardians.com',
      'tr-TR': 'https://pawguardians.com/tr',
    },
  },
  category: 'technology',
  classification: 'Blockchain Animal Welfare Platform',
  other: {
    'msapplication-TileColor': '#8b5cf6',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Theme and browser configuration */}
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="🐱 PawGuardians 🐶" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Emoji and icon optimization */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Enhanced emoji styling for better visibility */
            .emoji-large {
              font-size: 2.5rem !important;
              line-height: 1 !important;
              display: inline-block;
              vertical-align: middle;
            }
            
            .emoji-xl {
              font-size: 3.5rem !important;
              line-height: 1 !important;
              display: inline-block;
              vertical-align: middle;
            }
            
            .emoji-hero {
              font-size: 4.5rem !important;
              line-height: 1 !important;
              display: inline-block;
              vertical-align: middle;
              margin: 0 0.5rem;
              filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
            }
            
            /* Animal card emoji enhancement */
            .animal-image {
              font-size: 7rem !important;
            }
            
            @media (max-width: 768px) {
              .emoji-hero {
                font-size: 3.5rem !important;
              }
              .animal-image {
                font-size: 6rem !important;
              }
            }
            
            @media (max-width: 480px) {
              .emoji-hero {
                font-size: 2.5rem !important;
              }
              .animal-image {
                font-size: 5rem !important;
              }
            }
            
            /* Title emoji enhancement */
            title {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            }
            
            /* Smooth scroll behavior */
            html {
              scroll-behavior: smooth;
            }
            
            /* Enhanced focus styles for accessibility */
            *:focus {
              outline: 2px solid #fbbf24;
              outline-offset: 2px;
            }
            
            /* Custom scrollbar for webkit browsers */
            ::-webkit-scrollbar {
              width: 8px;
            }
            
            ::-webkit-scrollbar-track {
              background: #1a0d2e;
            }
            
            ::-webkit-scrollbar-thumb {
              background: linear-gradient(135deg, #8b5cf6, #fbbf24);
              border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(135deg, #7c3aed, #f59e0b);
            }
          `
        }} />
        
        {/* Structured data for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PawGuardians",
              "alternateName": "Paw Guardians",
              "url": "https://pawguardians.com",
              "logo": "https://pawguardians.com/logo.png",
              "description": "Transparent stray animal support platform on Stellar blockchain",
              "foundingDate": "2024",
              "sameAs": [
                "https://twitter.com/pawguardians",
                "https://github.com/pawguardians"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@pawguardians.com"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-yellow-400 text-purple-900 px-4 py-2 rounded-lg font-medium z-50"
        >
          Skip to main content
        </a>
        
        {/* Loading indicator */}
        <div id="loading-indicator" className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-yellow-400 transform scale-x-0 transition-transform duration-300 z-50"></div>
        
        {/* Main application wrapper */}
        <div id="root" className="min-h-screen flex flex-col">
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </div>
        
        {/* Performance and analytics scripts can be added here */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Simple loading indicator
              window.addEventListener('beforeunload', function() {
                document.getElementById('loading-indicator')?.classList.add('scale-x-100');
              });
              
              // Remove loading indicator when page loads
              window.addEventListener('load', function() {
                document.getElementById('loading-indicator')?.classList.remove('scale-x-100');
              });
              
              // Enhanced console message for developers
              console.log('🐱 PawGuardians 🐶 - Animal-friendly future with blockchain! 🌟');
              console.log('GitHub: https://github.com/pawguardians');
              console.log('Built with ❤️ for street animals');
            `
          }}
        />
      </body>
    </html>
  );
}