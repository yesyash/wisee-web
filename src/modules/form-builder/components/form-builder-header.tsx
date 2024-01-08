import { Button } from "@/components"

export const FormBuilderHeader = () => {
    return (
        <header className="fixed inset-0 bg-white h-max">
            <div className="flex items-center max-w-screen-2xl px-6 py-2">
                <h3 className="text-lg font-semibold">{process.env.NEXT_PUBLIC_APP_NAME}</h3>

                <div className="ml-auto">
                    <Button variant="ghost">Preview</Button>
                </div>
            </div>
        </header>
    )
}
