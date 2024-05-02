import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProps {
    product: Pick<Product, "discountPercentage">
}
const DiscountBadge = ({ product }: DiscountBadgeProps) => {
    return ( 
            <div className="gap-[2px] bg-primary px-2 py-[2px] text-white flex items-center rounded-full">
            <ArrowDownIcon size={12}/>
            <span className="font-semibold text-xs">{product.discountPercentage}%</span>
        </div>
     );
}
 
export default DiscountBadge;