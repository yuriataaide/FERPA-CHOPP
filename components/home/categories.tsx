"use client"

import { motion } from "framer-motion"
import { Beer, Wine, Droplets, Zap, GlassWater, Snowflake, Package, Cylinder, Settings } from "lucide-react"
import Link from "next/link"

const categories = [
  { name: "Chopp", icon: Beer, href: "/produtos?categoria=chopp" },
  { name: "Cervejas", icon: Beer, href: "/produtos?categoria=cervejas" },
  { name: "Refrigerantes", icon: GlassWater, href: "/produtos?categoria=refrigerantes" },
  { name: "Água Mineral", icon: Droplets, href: "/produtos?categoria=agua" },
  { name: "Energéticos", icon: Zap, href: "/produtos?categoria=energeticos" },
  { name: "Destilados", icon: Wine, href: "/produtos?categoria=destilados" },
  { name: "Gelo", icon: Snowflake, href: "/produtos?categoria=gelo" },
  { name: "Descartáveis", icon: Package, href: "/produtos?categoria=descartaveis" },
  { name: "Choppeiras", icon: Settings, href: "/locacao?tipo=choppeiras" },
  { name: "Cilindros", icon: Cylinder, href: "/locacao?tipo=cilindros" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function Categories() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nossos Produtos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tudo o que você precisa para seu evento em um só lugar
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div key={category.name} variants={itemVariants}>
              <Link href={category.href}>
                <div className="group flex flex-col items-center justify-center p-6 md:p-8 bg-card rounded-2xl border border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 hover:-translate-y-1 cursor-pointer">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                    <category.icon className="w-7 h-7 md:w-8 md:h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
                  </div>
                  <span className="text-sm md:text-base font-medium text-foreground group-hover:text-secondary transition-colors duration-300 text-center">
                    {category.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
