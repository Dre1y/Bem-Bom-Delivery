import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";

const fetch = async () => {
  const getProducts = db.product.findMany({
    where: {
        discountPercentage: {
            gt: 0,
        },
    },
    take: 10,
    include: {
        restaurant: {
            select: {
                name: true,
            },
        },
    }
})

const getBurguersCategory = await db.category.findFirst({
  where: {
    name: "Hambúrgueres",
  },
})

const getPizzasCategory = await db.category.findFirst({
  where: {
    name: "Pizzas",
  }
})

const [products, burguersCategory, pizzasCategory] = await Promise.all([getProducts, getBurguersCategory, getPizzasCategory])

return {products, burguersCategory, pizzasCategory}
}

const Home = async () => {
  const {products, burguersCategory, pizzasCategory} = await fetch()

  return ( 
  <>
    <Header />

    <div className="px-5 pt-6">
      <Search />
    </div>

    <div className="px-5 pt-6">
      <CategoryList />
    </div>

    <div className="px-5 pt-6">
      <Link href={`/categories/${pizzasCategory?.id}/products`}>
        <PromoBanner src="/promo-banner-01.png" alt="Até 30% de desconto em pizzas!"/>
      </Link>
    </div>

    <div className="pt-6 space-y-4">
      <div className="px-5 flex items-center justify-between">
        <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button variant="ghost" className="p-0 text-primary hover:bg-transparent h-fit" asChild>
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
              </Link>
            </Button>
      </div>
      <ProductList products={products}/>
    </div>

    <div className="px-5 pt-6">
      <Link href={`/categories/${burguersCategory?.id}/products`}>
        <PromoBanner src="/promo-banner-02.png" alt="A partir de R$ 17,90 em lanches!"/>
      </Link>
    </div>

    <div className="py-6 space-y-4">
      <div className="px-5 flex items-center justify-between">
        <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button variant="ghost" className="p-0 text-primary hover:bg-transparent h-fit" asChild>
                  <Link href="/restaurants/recommended">
                  Ver todos
                  <ChevronRightIcon size={16} />
                  </Link>
              </Button>
      </div>
      <RestaurantList />
    </div>
  </>
  )
};

export default Home;
