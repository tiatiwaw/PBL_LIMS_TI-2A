import { Button } from '@/components/ui/button';

export const NavItem = ({ item, isActive }) => (
    <Button
        variant={isActive ? "secondary" : "ghost"}
        className={`
            w-full justify-start gap-3 py-6 rounded-xl 
            transition-all duration-300 ease-out
            ${isActive
                ? 'bg-white/15 text-white hover:bg-white/25 shadow-lg backdrop-blur-sm'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }
            focus-visible:outline-none focus-visible:ring-2 
            focus-visible:ring-white/40 focus-visible:ring-offset-2 
            focus-visible:ring-offset-[#024D60]
            md:text-lg lg:text-lg
        `}
    >
        <item.icon className="transition-transform duration-300 group-hover:scale-110" />
        <h4 className="font-medium">{item.name}</h4>
        {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-white rounded-r-full" />
        )}
    </Button>
);