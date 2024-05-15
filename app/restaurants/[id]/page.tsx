import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";

interface RestaurantPageProps {
    params: {
        id: string
    }
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
    const restaurant = await db.restaurant.findUnique({
        where: {
            id
        },
        include: {
            categories: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    products: {
                        where: {
                            restaurantId: id,
                        },
                        include: {
                            restaurant: {
                                select: {
                                    name: true,
                                },
                            }
                        }
                    }
                }
            },
            products: {
                take: 10,
                include: {
                    restaurant: {
                        select: {
                            name: true,
                        },
                    }
                }
            }
        }
    })
    
    if (!restaurant) {
        return notFound()
    }

    return ( 
        <div>
            <RestaurantImage restaurant={restaurant}/>

            <div className="flex justify-between items-center px-5 pt-5 relative z-50 rounded-tl-3xl rounded-tr-3xl mt-[-1.5rem] bg-white">
                <div className="flex items-center gap-[0.375rem]">
                    <div className="relative h-8 w-8">
                        <Image src={restaurant.imageUrl} alt={restaurant.name} className="rounded-full object-cover" fill
                        />
                    </div>

                    <div>
                        <h1 className="text-xs font-semibold">{restaurant.name}</h1>
                    </div>
                </div>

                <div className="flex gap-[3px] px-2 py-[2px] items-center rounded-full bg-foreground text-white">
                    <StarIcon size={12} className="fill-yellow-400 text-yellow-400"/>
                <span className="font-semibold text-xs">5,0</span>

                </div>
            </div>

            <div className="px-5">
                <DeliveryInfo restaurant={restaurant}/>
            </div>

            <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden px-5 mt-3">
                {restaurant.categories.map((category) => (<div className="bg-[#F4F4F4] min-w-[167px] rounded-lg text-center" key={category.id}>
                    <span className="text-muted-foreground text-xs">{category.name}</span>
                </div>))}
            </div>

            <div className="mt-6 space-y-4">
                <h2 className="font-semibold px-5">Mais pedidos</h2>
                <ProductList products={restaurant.products}/>
            </div>

            {restaurant.categories.map((category) => (
                <div className="mt-6 space-y-4" key={category.id}>
                <h2 className="font-semibold px-5">{category.name}</h2>
                <ProductList products={category.products}/>
            </div>
            ))}

            <CartBanner restaurant={restaurant}/>
        </div>
     );
}
 
export default RestaurantPage;