import { Bell, CreditCard, FileDuoToneBlack, Home, Settings } from "@/components/icons";

export const MENU_ITEMS = (
    workspaceID: string
):{title:string;href:string; icon:React.ReactNode}[]=>[
    {title:'Home',href: `/dashboard/${workspaceID}/home`,icon:<Home/>},
    {title:'My Library',href: `/dashboard/${workspaceID}`,icon:<FileDuoToneBlack/>},
    {title:'Notifications',href: `/dashboard/${workspaceID}/notifications`,icon:<Bell/>},
    {title:'Billing',href: `/dashboard/${workspaceID}/billing`,icon:<CreditCard/>},
    {title:'Settings',href: `/dashboard/${workspaceID}/settings`,icon:<Settings/>}
]