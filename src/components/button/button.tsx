import { forwardRef } from "react"
import React from "react"

import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2Icon } from "lucide-react"

import { cn } from "@/utils/classname"

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: "bg-blue-600 text-stone-50 hover:bg-blue-700 active:bg-blue-800",
                destructive:
                    "bg-red-600 text-stone-50 hover:bg-red-700 active:bg-red-800",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
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
            variant: "primary",
            size: "default",
        },
    }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean,
    loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size, asChild = false, loading, disabled, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        return (
            <Comp
                ref={ref}
                data-loading={loading}
                disabled={loading || disabled}
                className={cn(buttonVariants({ variant, size, className }))}
                {...props}
            >
                {asChild ? (
                    React.isValidElement(children) ? (
                        React.cloneElement(children, undefined, loading && <Loader2Icon />, children.props.children)
                    ) : null
                ) : (
                    <>
                        {loading && <Loader2Icon />}
                        {children}
                    </>
                )}
            </Comp>
        )
    }
)

Button.displayName = "Button"

export { Button, buttonVariants }
