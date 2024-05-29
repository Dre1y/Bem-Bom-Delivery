import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";

const Cart = () => {
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

    const {data} = useSession()

    const { products, subtotalPrice, totalPrice, totalDiscounts, clearCart } = useContext(CartContext);

    const handleFinishOrderClick = async () => {
        if (!data?.user) return;
        const restaurant = products[0].restaurant

        try {
            setIsSubmitLoading(true)
            await createOrder({
                subtotalPrice,
                totalDiscounts,
                totalPrice,
                deliveryFee: restaurant.deliveryFee,
                deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
                restaurant: {
                    connect: { id: restaurant.id },
                },
                status: OrderStatus.CONFIRMED,
                user: {
                    connect: {id: data.user.id},
                },
                products: {
                    createMany: {
                        data: products.map((product) => ({
                            productId: product.id,
                            quantity: product.quantity,
                        }))
                    }
                }
            });

            clearCart()
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitLoading(false)
        }
    };

    return ( 
    <>
    <div className="flex h-full flex-col py-5">

        {products.length > 0 ? (
            <>
            <div className="flex-auto space-y-4">
                {products.map((product) => (<CartItem key={product.id} cartProduct={product}/>))}
            </div>

            <div className="mt-6">
            <Card>
                <CardContent className="p-5 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatCurrency(subtotalPrice)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Descontos</span>
                        <span>- {formatCurrency(totalDiscounts)}</span>
                    </div>

                    <Separator className="h-[0.5px]"/>

                    <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Entrega</span>

                        {Number(products?.[0].restaurant.deliveryFee) === 0 ? <span className="uppercase text-primary">Grátis</span> : formatCurrency(Number(products?.[0].restaurant.deliveryFee))}
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center text-xs font-semibold">
                        <span>Total</span>
                        <span>{formatCurrency(totalPrice)}</span>
                    </div>

                    <Separator />
                </CardContent>
            </Card>
        </div>

        <Button className="mt-6 w-full" onClick={() => setIsConfirmDialogOpen(true)}>
            Finalizar Pedido</Button>
        </>
        ) : <h2 className="font-medium text-center">Sua sacola está vazia.</h2>}
    </div>

    <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
                Você está prestes a finalizar o pedido. Certifique-se de que todos os produtos estejam corretos.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>
                Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleFinishOrderClick} disabled={isSubmitLoading}>
            {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            )}
            Finalizar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
    );
}
 
export default Cart;