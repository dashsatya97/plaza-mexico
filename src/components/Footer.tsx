import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { business, navigation, hours, socials } from "../data/restaurant";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "./icons/SocialIcons";
import Newsletter from "./Newsletter";

// Footer component for the website. It displays brand info, navigation, hours, and contact details.
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Outer wrapper with centered max width and padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter capture sits above the link columns */}
        <div className="mb-12">
          <Newsletter />
        </div>

        {/* Four column layout on large screens, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            {/* Brand name and tagline */}
            <h3 className="text-2xl font-bold text-white mb-4">
              {business.name}
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {business.tagline}
            </p>

            {/* Social links with icons */}
            <div className="flex gap-3">
              <a
                href={socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="touch-target rounded-lg bg-gray-800 hover:bg-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="touch-target rounded-lg bg-gray-800 hover:bg-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="touch-target rounded-lg bg-gray-800 hover:bg-primary-500 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon size={18} />
              </a>
            </div>
          </div>

          <div>
            {/* Navigation links use react-router Link for client-side routing */}
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-secondary-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {/* Business hours grouped by weekdays and weekends */}
            <h4 className="text-lg font-semibold text-white mb-4">Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:items-center">
                <span className="text-gray-400">Weekdays (Mon-Fri)</span>
                <span className="text-gray-300">{hours.Monday}</span>
              </li>
              <li className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:items-center">
                <span className="text-gray-400">Weekends (Sat-Sun)</span>
                <span className="text-gray-300">{hours.Saturday}</span>
              </li>
            </ul>
          </div>

          <div>
            {/* Contact details including address, phone, and email */}
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-secondary-500 mt-0.5 shrink-0"
                />
                <span className="text-gray-400">{business.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary-500 shrink-0" />
                <a
                  href={`tel:${business.phoneHref}`}
                  className="text-gray-400 hover:text-secondary-500 transition-colors"
                >
                  {business.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary-500 shrink-0" />
                <a
                  href={`mailto:${business.email}`}
                  className="text-gray-400 hover:text-secondary-500 transition-colors break-all"
                >
                  {business.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {business.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
