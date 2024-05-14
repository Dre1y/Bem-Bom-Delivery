"use client"

import Cart from "@/app/_components/cart";
import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<
    {
        include: {
            restaurant: true
        }
    }>;
    complementaryProducts: Prisma.ProductGetPayload<
    {
        include: {
            restaurant: true
        }
    }>[];
}

const ProductDetails = ({ product, complementaryProducts }: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState(1);
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)

    const { addProductToCart, products } = useContext(CartContext)

    const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
        addProductToCart({ product, quantity, emptyCart })
        setIsCartOpen(true)
    }

    console.log(products)

    const handleAddToCartClick = () => {

        const hasDifferentRestaurantProduct = products.some((cartProduct) => cartProduct.restaurantId !== product.restaurantId)

        if (hasDifferentRestaurantProduct) {
            return setIsConfirmationDialogOpen(true)
        }

        addToCart({
            emptyCart: false,
        })
    }

    const handleIncreaseQuantity = () => setQuantity((currentState) => currentState + 1)
    const handleDecreaseQuantity = () => setQuantity((currentState) => {
        if (currentState === 1) return 1

        return currentState - 1
    })

    return (
        <>
        <div className="py-5 relative z-50 rounded-tl-3xl rounded-tr-3xl mt-[-1.5rem] bg-white">
                <div className="flex items-center gap-[0.375rem] px-5">
                    <div className="relative h-6 w-6">
                        <Image src={product.restaurant.imageUrl} alt={product.restaurant.name} className="rounded-full object-cover" fill
                        />
                    </div>
                    <span className="text-xs text-muted-foreground">{product.restaurant.name}</span>
                </div>

                <h1 className="text-xl font-semibold mb-3 mt-1 px-5">{product.name}</h1>

                <div className="flex justify-between px-5">

                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-semibold text-xl">{formatCurrency(calculateProductTotalPrice(product))}</h2>
                            {product.discountPercentage > 0 && (
                            <DiscountBadge product={product}/>
                            )}
                        </div>

                        {product.discountPercentage > 0 && (
                            <p className="text-muted-foreground text-sm">De: {formatCurrency(Number(product.price))}</p>
                        )}
                    </div>

                    <div className="flex gap-3 items-center text-center">
                        <Button size="icon" variant="ghost" className="border-muted-foreground border border-solid" onClick={handleDecreaseQuantity}>
                            <ChevronLeftIcon />
                        </Button>
                        <span className="w-4">{quantity}</span>
                        <Button size="icon" onClick={handleIncreaseQuantity}>
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </div>

                <div className="px-5">
                    <DeliveryInfo restaurant={product.restaurant}/>
                </div>

                <div className="mt-6 space-y-3 px-5">
                    <h3 className="font-semibold">Sobre</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>

                <div className="mt-6 space-y-3">
                    <h3 className="font-semibold px-5">Sucos</h3>
                    <ProductList products={complementaryProducts}/>
                </div>

                <div className="mt-6 px-5">
                    <Button className="w-full font-semibold" onClick={handleAddToCartClick}>Adicionar à sacola</Button>
                </div>
            </div>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetContent className="h-[90vm]">
                    <SheetHeader>
                        <SheetTitle className="text-left">Sacola</SheetTitle>
                    </SheetHeader>
                    <Cart />
                </SheetContent>
            </Sheet>

            <AlertDialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Sua sacola não está vazia!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Deseja continuar? Isso limpará toda a sua sacola atual.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>Sim, tenho certeza</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </> 
     );
}
 
export default ProductDetails;