"use client"

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../_actions/search";
import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";

interface RestaurantProps {
    userFavoriteRestaurant: UserFavoriteRestaurant[];
}

const Restaurants = ({userFavoriteRestaurant}: RestaurantProps) => {
    const searchParams = useSearchParams()
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])

    const searchFor = searchParams.get("search")

    useEffect(() => {
        const fetchRestaurants = async () => {
            if (!searchFor) return
            const foundRestaurants = await searchForRestaurants(searchFor)
            setRestaurants(foundRestaurants)
        }

        fetchRestaurants()
    }, [searchFor])

    if(!searchFor) {
        return notFound()
    }

    return <>

    <Header />

    <div className="py-6 px-5">
        <h2 className="mb-6 font-semibold text-ls">Restaurantes Encontrados</h2>
        <div className="flex flex-col w-full space-y-4 gap-6">
        {restaurants.map((restaurant) => (
            <RestaurantItem key={restaurant.id} restaurant={restaurant} className="min-w-full max-w-full" userFavoritesRestaurants={userFavoriteRestaurant}/>
        ))}
    </div>
    </div>

    </>
}
 
export default Restaurants;