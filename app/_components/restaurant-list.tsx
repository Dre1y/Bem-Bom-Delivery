import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";

const RestaurantList = async () => {
    const restaurants = await db.restaurant.findMany({ take: 10 })
    return ( 
        <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 px-5">
            {restaurants.map((restaurant) => (
                <RestaurantItem key={restaurant.id} restaurant={restaurant} />
            ))}
        </div>
     );
}
 
export default RestaurantList;