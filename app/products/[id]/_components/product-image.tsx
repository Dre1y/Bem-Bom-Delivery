"use client"

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronsLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
    product: Pick<Product, 'name' | 'imageUrl'>
}

const ProductImage = ({product}: ProductImageProps) => {
    const router = useRouter()

    const handleBackClick = () => router.back()

    return ( 
        <div>
            <div className="relative w-full h-[360px]">
                <Image src={product.imageUrl} alt={product.name} fill className="object-cover"
                />

                <Button className="absolute left-4 top-4 bg-white text-foreground rounded-full hover:text-white" size="icon" onClick={handleBackClick}>
                    <ChevronsLeftIcon />
                </Button>
            </div>
        </div>
     );
}
 
export default ProductImage;