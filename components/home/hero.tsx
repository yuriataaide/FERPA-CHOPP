"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Truck } from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-6 flex items-center justify-center">
          <img
            src="/ferpa-icon.webp"
            alt="Ferpa Chopp"
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Main Heading */}
        <motion.h1
          variants={fadeInUp}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight text-balance"
        >
          Ferpa Chopp
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeInUp}
          className="text-secondary font-medium text-lg sm:text-xl md:text-2xl mb-4 tracking-wide"
        >
          Distribuidora e representante certificada da Ecobier no Rio Grande do Sul
        </motion.p>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Chopp, bebidas e equipamentos completos para eventos.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/produtos">
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[200px] bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-6 text-base transition-all duration-300 hover:scale-105"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Fazer Pedido
            </Button>
          </Link>

          <Link href="/cliente">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto min-w-[200px] border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-medium px-8 py-6 text-base transition-all duration-300 hover:scale-105"
            >
              <User className="mr-2 h-5 w-5" />
              Área do Cliente
            </Button>
          </Link>

          <Link href="/locacao">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto min-w-[200px] border-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground font-medium px-8 py-6 text-base transition-all duration-300 hover:scale-105"
            >
              <Truck className="mr-2 h-5 w-5" />
              Alugar Equipamentos
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
