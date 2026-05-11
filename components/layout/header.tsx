"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import { useCartStore } from "@/lib/store/cart"

const navLinks = [
  { name: "Produtos", href: "/produtos" },
  { name: "Locação", href: "/locacao" },
  { name: "Sobre", href: "/sobre" },
  { name: "Contato", href: "/contato" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { getItemCount } = useCartStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  const itemCount = mounted ? getItemCount() : 0

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="mb-6 flex items-center justify-center">
              <img
                src="/ferpa-icon.webp"
                alt="Ferpa Chopp"
                className="w-24 h-24 object-contain"
              />
            </div>
            <span className="font-serif text-xl font-bold text-foreground hidden sm:block">
              Ferpa Chopp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/carrinho">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/cliente">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <User className="h-4 w-4 mr-2" />
                Entrar
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-foreground font-medium py-2 border-b border-border/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex gap-4 pt-4">
                <Link href="/carrinho" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Carrinho
                  </Button>
                </Link>
                <Link href="/cliente" className="flex-1">
                  <Button className="w-full bg-primary text-primary-foreground">
                    <User className="h-4 w-4 mr-2" />
                    Entrar
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
