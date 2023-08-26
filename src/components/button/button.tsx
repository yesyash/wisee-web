type Props = {
    children: React.ReactNode
}

export const Button = ({ children }: Props) => {
    return (
        <button className="flex items-center py-2 px-4 bg-gray-800 text-white shadow">
            {children}
        </button>
    )
}
