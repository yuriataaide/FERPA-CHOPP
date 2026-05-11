"use client"

import { motion } from "framer-motion"
import { Truck, Clock, Shield, Award } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Entrega Rápida",
    description: "Entregamos em todo o Rio Grande do Sul com agilidade e pontualidade para seu evento."
  },
  {
    icon: Clock,
    title: "Atendimento 24h",
    description: "Suporte disponível a qualquer momento para garantir o sucesso do seu evento."
  },
  {
    icon: Shield,
    title: "Qualidade Garantida",
    description: "Produtos de alta qualidade com certificação e procedência garantida."
  },
  {
    icon: Award,
    title: "Representante Oficial",
    description: "Distribuidora certificada Ecobier, referência em qualidade de chopp no mercado."
  }
]

export function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Por que escolher a Ferpa Chopp?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Compromisso com excelência em cada detalhe do seu evento
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
