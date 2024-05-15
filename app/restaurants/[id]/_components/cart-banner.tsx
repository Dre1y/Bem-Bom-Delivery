"use client"

import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { Restaurant } from "@prisma/client";
import { useContext } from "react";

interface CartBannerProps {
    restaurant: Pick<Restaurant, 'id'>
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
    const {products, totalPrice, totalQuantity} = useContext(CartContext)

    const restaurantHasProductOnCart = products.some((product) => product.restaurantId === restaurant.id)

    if (!restaurantHasProductOnCart) return null

    return ( 
        <div className="fixed z-50 w-full bottom-0 left-0 p-5 pt-3 bg-white border-t border-solid border-muted-foreground shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <span className="text-xs text-muted-foreground">Total sem entrega</span>
                    <h3 className="font-semibold">{formatCurrency(totalPrice)} 
                        <span className="text-xs text-muted-foreground font-normal"> {" "} / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
                        </span>
                    </h3>
                </div>

                <Sheet>
                    <SheetTrigger>
                        <Button>Ver sacola</Button>
                    </SheetTrigger>
                <SheetContent className="h-[90vm]">
                    <SheetHeader>
                        <SheetTitle className="text-left">Sacola</SheetTitle>
                    </SheetHeader>
                    <Cart />
                </SheetContent>
            </Sheet>

            </div>
        </div>
     );
}
 
export default CartBanner;