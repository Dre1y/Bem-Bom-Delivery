import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { db } from "@/app/_lib/prisma";

const RecommendedRestaurants = async () => {
    const restaurants = await db.restaurant.findMany({})
    return ( 

        <>

        <Header />

        <div className="py-6 px-5">
            <h2 className="mb-6 font-semibold text-ls">Restaurantes Recomendados</h2>
            <div className="flex flex-col w-full space-y-4 gap-6">
            {restaurants.map((restaurant) => (
                <RestaurantItem key={restaurant.id} restaurant={restaurant} className="min-w-full max-w-full"/>
            ))}
        </div>
        </div>

        </>

     );
}
 
export default RecommendedRestaurants;