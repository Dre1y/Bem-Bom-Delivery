import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";

const RecommendedRestaurants = async () => {
    const session = await getServerSession(authOptions)
    const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
        where: { userId: session?.user.id },
        include: {
            restaurant: true,
        }
    })
    
    const restaurants = await db.restaurant.findMany({})
    return ( 

        <>

        <Header />

        <div className="py-6 px-5">
            <h2 className="mb-6 font-semibold text-ls">Restaurantes Recomendados</h2>
            <div className="flex flex-col w-full space-y-4 gap-6">
            {restaurants.map((restaurant) => (
                <RestaurantItem key={restaurant.id} restaurant={JSON.parse(JSON.stringify(restaurant))} className="min-w-full max-w-full" userFavoritesRestaurants={userFavoriteRestaurants}/>
            ))}
        </div>
        </div>

        </>

     );
}
 
export default RecommendedRestaurants;