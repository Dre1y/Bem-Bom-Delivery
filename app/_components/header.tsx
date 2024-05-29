"use client"

import Image from "next/image";
import { Button } from "./ui/button";
import { HeartIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, ScrollTextIcon } from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
    const { data } = useSession();

    const handleSignOutClick = () => signOut();
    const handleSignInClick = () => signIn();

    return (

        <div className="flex justify-between pt-6 px-5">
            <div className="relative h-[30px] w-[100px]">
                <Link href="/">
                <Image src="/logo.png" alt="Bem Bom Delivery" fill className="object-cover"/>
                </Link>
            </div>
            
                <Sheet>
                    <SheetTrigger>
                        <Button size="icon" variant="outline" className="bg-transparent border-none">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>

                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>

                        {data?.user ? <>
                        <div className="flex justify-between pt-6">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={data?.user?.image as string | undefined} />
                                    <AvatarFallback>{data?.user?.name?.split(" ")[0][0]}{data?.user?.name?.split(" ")[1][0]}</AvatarFallback>
                                </Avatar>

                                <div>
                                    <h3 className="font-semibold">{data?.user?.name}</h3>
                                    <span className="block text-xs text-muted-foreground">{data?.user?.email}</span>
                                </div>
                            </div>

                        </div>
                        </> : (
                            <>
                                <div className="flex justify-between items-center pt-10">
                                    <h2 className="font-semibold">Olá, faça seu login!</h2>
                                    <Button onClick={handleSignInClick} size='icon'><LogInIcon /></Button>
                                </div>
                            </>
                        )}

                        <div className="py-6">
                            <Separator />
                        </div>

                        <div className="space-y-2">
                            <Button variant="ghost" className="w-full space-x-3 justify-start text-sm font-normal rounded-full">
                                <HomeIcon size={16}/>
                                <span className="block">Início</span>
                            </Button>

                            {data?.user && (
                                <>
                                    <Button variant="ghost" className="w-full space-x-3 justify-start text-sm font-normal rounded-full" asChild>
                                    <Link href={'/my-orders'}>
                                    <ScrollTextIcon size={16}/>
                                    <span className="block">Meus pedidos</span>
                                    </Link>
                                </Button>

                                <Button variant="ghost" className="w-full space-x-3 justify-start text-sm font-normal rounded-full">
                                    <HeartIcon size={16}/>
                                    <span className="block">Restaurantes Favoritos</span>
                                </Button>
                                </>
                            )}
                        </div>

                        <div className="py-6">
                            <Separator />
                        </div>

                        {data?.user && (
                                <Button variant="ghost" className="w-full space-x-3 justify-start text-sm font-normal rounded-full" onClick={handleSignOutClick}>
                                <LogOutIcon size={16}/>
                                <span className="block">Sair da conta</span>
                            </Button>
                        )}
                    </SheetContent>
                </Sheet>
            </div>
     );
}
 
export default Header;