import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
    const { products, subTotalPrice, totalPrice, totalDiscounts } = useContext(CartContext)
    return ( 
    <div className="py-5">
        <div className="space-y-4">
            {products.map((product) => (<CartItem key={product.id} cartProduct={product}/>))}
        </div>

        <div className="mt-6">
            <Card>
                <CardContent className="p-5 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatCurrency(subTotalPrice)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Descontos</span>
                        <span>- {formatCurrency(totalDiscounts)}</span>
                    </div>

                    <Separator className="h-[0.5px]"/>

                    <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Entrega</span>

                        {Number(products[0].restaurant.deliveryFee) === 0 ? <span className="uppercase text-primary">Grátis</span> : formatCurrency(Number(products[0].restaurant.deliveryFee))}
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

        <Button className="mt-6 w-full">Finalizar Pedido</Button>
    </div>
    );
}
 
export default Cart;