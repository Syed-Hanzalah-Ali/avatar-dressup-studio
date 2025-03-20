
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Avatar Studio</h3>
            <p className="text-sm text-muted-foreground">
              Create your digital twin and try on virtual clothing with our cutting-edge 3D technology.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/avatar" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  3D Avatar Creation
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Virtual Try-On
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Clothing Catalog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                support@avatardressup.com
              </li>
              <li className="text-sm text-muted-foreground">
                1234 Fashion Street, Style City
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} Avatar Dress-Up Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
