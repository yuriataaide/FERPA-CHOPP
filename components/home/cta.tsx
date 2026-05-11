"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Pronto para seu próximo evento?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
            Entre em contato conosco e solicite um orçamento personalizado. 
            Nossa equipe está pronta para atender você.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://wa.me/5554999746974" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg"
                className="w-full sm:w-auto min-w-[200px] bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium px-8 py-6 text-base transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
            </Link>
            
            <Link href="tel:+5554999746974">
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto min-w-[200px] border-2 border-primary-foreground/30 text-foreground hover:bg-primary-foreground/10 font-medium px-8 py-6 text-base transition-all duration-300 hover:scale-105"
              >
                <Phone className="mr-2 h-5 w-5" />
                Ligar Agora
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
