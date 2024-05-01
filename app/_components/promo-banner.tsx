import Image, { ImageProps } from "next/image";

interface PromoBannerProps {

}

const PromoBanner = (props: ImageProps) => {
    return ( 
        <Image height={0} width={0} className="w-full h-auto object-contain" sizes="100vw" quality={100} {...props}/>
     );
}
 
export default PromoBanner;