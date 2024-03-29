import { ButtonHTMLAttributes, FC, forwardRef } from "react"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"


const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: 'bg-dark text-slate-50 hover:bg-dark/80 font-normal border dark:border-input',
        outline: 'border border-input bg-accent dark:text-slate-50 text-dark dar:text-slate-50 bg-white dark:bg-dark',
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        subtle: 'hover:bg-input/70 bg-input text-zinc-900 dark:bg-[#8f6a2e] dark:text-slate-50',
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

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants>{
  isLoading?: boolean
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, children, size,  isLoading, ...props}: ButtonProps, ref) => {
  return (
          <button 
            ref={ref} 
            className={cn(buttonVariants({className, variant, size}))}
            {...props}
            disabled={isLoading}
          >{isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
            {children}
          </button>
        )
  }
)

Button.displayName = 'Button';

export { Button, buttonVariants }


