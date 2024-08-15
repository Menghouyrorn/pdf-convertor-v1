"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export const ThemeButton=()=>{
    const {setTheme} = useTheme();
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'} size={'icon'}>
                    <Sun className="h-5 w-5"/>
                    <Moon className="absolute h-5 w-5 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                    <span className="sr-only">Theme mode</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={()=>setTheme('light')}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setTheme('dark')}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setTheme('system')}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}