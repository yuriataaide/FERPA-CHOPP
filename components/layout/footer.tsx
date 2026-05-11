"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react"
import Link from "next/link"

const quickLinks = [
  { name: "Produtos", href: "/produtos" },
  { name: "Locação", href: "/locacao" },
  { name: "Área do Cliente", href: "/cliente" },
  { name: "Sobre Nós", href: "/sobre" },
  { name: "Contato", href: "/contato" },
]

const categories = [
  { name: "Chopp", href: "/produtos?categoria=chopp" },
  { name: "Cervejas", href: "/produtos?categoria=cervejas" },
  { name: "Refrigerantes", href: "/produtos?categoria=refrigerantes" },
  { name: "Choppeiras", href: "/locacao?tipo=choppeiras" },
  { name: "Cilindros", href: "/locacao?tipo=cilindros" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="mb-6 flex items-center justify-center">
                <img
                  src="/ferpa-icon.webp"
                  alt="Ferpa Chopp"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <span className="font-serif text-2xl font-bold">Ferpa Chopp</span>
            </div>
            <p className="text-background/70 leading-relaxed mb-6">
              Distribuidora e representante da Ecobier no Rio Grande do Sul.
              Qualidade e tradição em cada gota.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/ferpachopp/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-serif text-lg font-semibold mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-secondary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-serif text-lg font-semibold mb-6">Categorias</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-background/70 hover:text-secondary transition-colors duration-300"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-serif text-lg font-semibold mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-background/70">
                  Rua Osmani Veras - Olaria<br />
                  Terra de Areia - RS, 95535-000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-background/70">(54) 99974-6974</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-background/70">contato@ferpachopp.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-background/70">
                  Seg - Sex: 8h às 18h<br />
                  Sáb/Dom: Fechado
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm">
              © {new Date().getFullYear()} Ferpa Chopp. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacidade" className="text-background/50 hover:text-secondary transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="text-background/50 hover:text-secondary transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
