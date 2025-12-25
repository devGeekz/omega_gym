import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Facebook, Instagram, Send, Twitter } from "lucide-react";
import { GlassyContainer } from "../ui/glassy-background";
import Link from "next/link";

const footerLinks = [
  { name: "Contact Us", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const footerSocialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "Ticktok", href: "#", icon: Twitter },
];

export default function Footer() {
  return (
    <footer className="relative text-foreground transition-colors duration-300 mt-20 dark:bg-black">
      <GlassyContainer className="rounded-t-lg border border-b-0 border-black/10 dark:border-white/10 shadow-2xl">
        <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold tracking-tight">
                Stay Connected
              </h2>
              <p className="mb-6 text-muted-foreground">
                Join our newsletter for the latest updates and exclusive offers.
              </p>
              <form className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pr-12 backdrop-blur-sm"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </form>
              <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
              <address className="space-y-2 text-sm not-italic">
                <p>Smaala Residence Amine 1</p>
                <p>Settat , 2600</p>
                <p>Phone: +212 662783870</p>
                <p>Email: hello@example.com</p>
              </address>
            </div>
            <div className="relative">
              <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>

              <div className="mb-6 flex space-x-4">
                {footerSocialLinks.map((link) => (
                  <TooltipProvider key={link.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          asChild
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                        >
                          <Link
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <link.icon className="h-4 w-4" />
                            <span className="sr-only">{link.name}</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Follow us on {link.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2024 Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </GlassyContainer>
    </footer>
  );
}
