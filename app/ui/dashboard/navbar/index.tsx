"use client";
import React from "react";
import {LogOut, Menu, Moon, Search, Settings, Sun, User} from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsAuthenticated, setIsDarkMode, setIsSidebarCollapsed } from "@/app/redux/state";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

const Navbar = () =>{

    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state)=> state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state)=> state.global.isDarkMode);
    const router = useRouter();
    const {setTheme} = useTheme();

    const logout = () =>{
        const accessToken = Cookies.get("access_token");
        if(accessToken){
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
        }else{
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
        }
        dispatch(setIsAuthenticated(false));
        router.push("/login");
    }

    return(
        <nav className={`flex sticky top-0 items-center justify-between bg-white pr-6 py-3 dark:bg-black ${isSidebarCollapsed ? "pl-4" : "pl-72"}`}>
            {/* Search Bar */}
            <div className="flex items-center gap-8">
                {
                    !isSidebarCollapsed ? null : (
                        <button onClick={()=> dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
                            <Menu className="h-8 w-8 dark:text-white" />
                        </button>
                    )
                }
                <div className="relative flex h-min w-[200px]">
                    <Search className="absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white"/>
                    <input className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
                    type="search" placeholder="Search....." />
                </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3">
                <button onClick={()=> dispatch(setIsDarkMode(!isDarkMode))} 
                    className={`${isDarkMode ? `rounded p-2 dark:hover:bg-gray-700` : `rounded p-2 hover:bg-gray-100`}`}>
                        {isDarkMode ? (
                            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
                        ) : (
                            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
                        )}
                </button>
                
                <button onClick={()=> logout()} className="rounded-lg">
                    <LogOut className="dark:text-white rounded-full"/>
                </button>

                <Link href={"/dashboard/settings"}
                className={`${
                    isDarkMode ? "h-min w-min rounded p-2 dark:hover:bg-gray-700": "h-min w-min rounded p-2 hover:bg-gray-100"}`}
                >
                    <Settings className="h-6 w-6 cursor-pointer dark:text-white"/>
                </Link>
                <div className="ml-2 mr-2 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage  src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent sideOffset={10}>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>
                                <User/>
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings/>
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                                <LogOut/>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}


export default Navbar;