interface handleChangeProps {
    event: any;
    groupName: string;
    multiple: boolean;
    form: any;
    item: any;
    index: number;
}

export const handleCheckbox = ({
    event,
    groupName,
    multiple,
    form,
    item,
    index
}: handleChangeProps) => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(`input[name="${groupName}"]`);
    const otherCheckbox = document.querySelector<HTMLInputElement>("input[name=\"isOtherLegal\"]");

    const handleSingleCheckbox = () => {
        checkboxes.forEach((checkbox, i) => {
            if (i !== index) {
                checkbox.checked = false;
            }
        });
        if (otherCheckbox) {
            otherCheckbox.checked = false;
            form.setValue("isOtherLegal", false);
        }
    };

    const handleMultipleCheckbox = () => {
        const currentValue = form.getValues(groupName);
        const newValue = currentValue.includes(item.value)
            ? currentValue.filter((value: any) => value !== item.value)
            : [...currentValue, item.value];
        form.setValue(groupName, newValue);
    };

    const checked = event.target.checked;

    if (checked) {
        if (!multiple) {
            handleSingleCheckbox();
            form.setValue(groupName, item.value);
        } else {
            handleMultipleCheckbox();
        }
    } else {
        if (!multiple) {
            form.setValue(groupName, "");
        } else {
            handleMultipleCheckbox();
        }
    }
};

export function parseFormError(errors: any, pathName: string) {
    const error = errors[pathName];
    if (error) {
        if (error.message) return error.message;
        if (error.root && error.root.message) return error.root.message;
        if (error[pathName] && error[pathName].message) return error[pathName].message;
    }
}

export function formatLabel(fieldName: string, fieldperson: string): string {
    return fieldName
        .replace(fieldperson, "")
        .replace("PoliticallyExposed", "Politically exposed person (PEP):")
        .replace("politicallyExposed", "Politically exposed person (PEP):")
        .replace("relativeExposed", "Relative or close associate to a (PEP):")
        .replace("Role", "Role in the Company")
        .replace("Name", "Full name / Company")
        .replace("Address", "Residential address")
        .replace(/([A-Z])/g, " $1")  // Add space before each capital letter
        .replace(/^./, str => str.toUpperCase());  // Capitalize the first letter
}