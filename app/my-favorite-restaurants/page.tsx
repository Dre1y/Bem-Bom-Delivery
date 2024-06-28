import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import { db } from "../_lib/prisma";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

const MyFavoriteRestaurants = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        return notFound()
    }

    const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            restaurant: true,
        }
    })

    return ( 
        <>

        <Header />

        <div className="py-6 px-5">
            <h2 className="mb-6 font-semibold text-ls">Restaurantes Favoritos</h2>
            <div className="flex flex-col w-full space-y-4 gap-6">
            {userFavoriteRestaurants.length > 0 ? userFavoriteRestaurants.map(({restaurant}) => (
                <RestaurantItem key={restaurant.id} restaurant={restaurant} className="min-w-full max-w-full" userFavoritesRestaurants={userFavoriteRestaurants}/>
            )) : <h3 className="font-medium">Nenhum restaurante favoritado.</h3>}
        </div>
        </div>

        </>
     );
}
 
export default MyFavoriteRestaurants;