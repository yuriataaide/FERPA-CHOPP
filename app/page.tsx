import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/home/hero"
import { Categories } from "@/components/home/categories"
import { Features } from "@/components/home/features"
import { CTA } from "@/components/home/cta"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        <Hero />
        <Categories />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
