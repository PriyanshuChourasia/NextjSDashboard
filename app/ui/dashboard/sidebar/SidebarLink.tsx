import { usePathname } from "next/navigation"
import Link from "next/link";
import { ISidebarLinkProps } from "./interfaces/ISidebarLink";


export const SidebarLink: React.FC<ISidebarLinkProps> = ({href,icon:Icon,label}) =>{
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

    return(
        <Link href={href} className="w-full">
            <div className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700
                ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""} justify-start px-8 py-3`}>
                    {
                        isActive && (
                            <div className="absolute left-0 top-0 h-[100%] w-[5px] " />
                        )
                    }

                    <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
                    <span className={`font-medium text-gray-800 dark:text-gray-100`}>
                        {label}
                    </span>
            </div>
        </Link>
    )
}