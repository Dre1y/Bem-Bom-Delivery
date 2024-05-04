"use client"

import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronsLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
    restaurant: Pick<Restaurant, 'name' | 'imageUrl'>
}

const RestaurantImage = ({restaurant}: RestaurantImageProps) => {
    const router = useRouter()

    const handleBackClick = () => router.back()

    return ( 
        <div>
            <div className="relative w-full h-[250px]">
                <Image src={restaurant.imageUrl} alt={restaurant.name} fill className="object-cover"
                />

                <Button className="absolute left-4 top-4 bg-white text-foreground rounded-full hover:text-white" size="icon" onClick={handleBackClick}>
                    <ChevronsLeftIcon />
                </Button>

                <Button size="icon" className="absolute top-4 right-4 bg-gray-700 rounded-full">
                <HeartIcon size={20} className="fill-white"/>
            </Button>
            </div>
        </div>
     );
}
 
export default RestaurantImage;