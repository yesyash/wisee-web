import { Edit, EditFormModeEnum } from "@/modules/forms/edit"

const CreatePage = () => {
    return (
        <Edit mode={EditFormModeEnum.CREATE_WITHOUT_LOGIN} />
    )
}

export default CreatePage
