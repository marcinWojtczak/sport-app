import { ButtonHTMLAttributes, FC, forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"


const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: 'bg-dark-blue text-slate-50 hover:bg-dark-blue/90 font-normal',
        outline: 'border border-input bg-dark-blue hover:bg-accent hover:text-accent-foreground text-slate-50',
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants>{}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, children, size, ...props }: ButtonProps, ref) => {
  return (
          <button 
            ref={ref} 
            className={cn(buttonVariants({className, variant, size}))}
          >{children}
          </button>
        )
  }
)



export { Button, buttonVariants }


