import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductGrid } from "@/components/products/product-grid"
import { getRentalProducts } from "@/lib/data/products"

export const metadata = {
  title: "Locação de Equipamentos | Ferpa Chopp",
  description: "Alugue choppeiras, cilindros de CO₂ e kits completos para seu evento.",
}

export default function RentalPage() {
  const rentalProducts = getRentalProducts()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 md:pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Locação de Equipamentos
            </h1>
            <p className="text-muted-foreground">
              Choppeiras, cilindros de CO₂ e kits completos para seu evento.
            </p>
          </div>
          <ProductGrid products={rentalProducts} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
