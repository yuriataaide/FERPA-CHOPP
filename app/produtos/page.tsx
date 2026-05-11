import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductGrid } from "@/components/products/product-grid"
import { products } from "@/lib/data/products"

export const metadata = {
  title: "Produtos | Ferpa Chopp",
  description: "Confira nosso catálogo completo de chopp, cervejas, bebidas e equipamentos para eventos.",
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 md:pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Nossos Produtos
            </h1>
            <p className="text-muted-foreground">
              Encontre tudo para seu evento: chopp, bebidas, gelo e muito mais.
            </p>
          </div>
          <ProductGrid products={products} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
