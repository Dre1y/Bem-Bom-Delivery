import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true,
                }
            }
        }
    }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
    return (
        <div className="space-y-2 w-[150px] min-w-[150px]">

            <div className="h-[150px] w-full relative">
                <Image src={product.imageUrl} alt={product.name} fill className="object-cover rounded-lg shadow-md"
                />

                {product.discountPercentage && (
                    <div className="absolute gap-[2px] top-2 left-2 bg-primary px-2 py-[2px] text-white flex items-center rounded-full">
                        <ArrowDownIcon size={12}/>
                        <span className="font-semibold text-xs">{product.discountPercentage}%</span>
                    </div>
                )}
            </div>
            
            <div>
                <h2 className="text-sm truncate">{product.name}</h2>
                <div className="flex gap-1 items-center">
                    <h3 className="font-semibold">
                        {formatCurrency(calculateProductTotalPrice(product))}
                    </h3>
                    {product.discountPercentage > 0 && (
                        <span className="text-muted-foreground line-through text-xs">
                            {formatCurrency(Number(product.price))}
                        </span>
                    )}
                </div>

                <span className="block text-muted-foreground text-xs">
                    {product.restaurant.name}
                    </span>
            </div>

        </div>
    )
}
 
export default ProductItem;