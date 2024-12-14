import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

type Props = {
    icon: React.ReactNode;
    title: string;
    href: string;
    selected: boolean;
    notifications?: number;
};

const SidebarItems = ({ href, icon, selected, title, notifications }: Props) => {
    return (
        <li className="cursor-pointer my-1.5">
            <Link
                href={href}
                className={cn(
                    "flex items-center justify-between group rounded-lg hover:bg-[#1D1D1D] transition-colors",
                    selected ? "bg-[#1D1D1D]" : ""
                )}
            >
                <div className="flex items-center gap-2 p-1.5">
                    {icon}
                    <span
                        className={cn(
                            "font-medium group-hover:text-[#9D9D9D] transition-colors truncate w-32",
                            selected ? "text-[#9D9D9D]" : "text-[#545454]"
                        )}
                    >
                        {title}
                    </span>
                </div>
                
            </Link>
        </li>
    );
};

export default SidebarItems;
