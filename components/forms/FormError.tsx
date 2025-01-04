import { parseFormError } from "@/lib/form.utils";
import { FormMessage } from "../ui/form";

const FormError = ({ errors, pathName }: { errors: any, pathName: string }) => {
  return (<div>
    <FormMessage>{errors && parseFormError(errors, pathName)}</FormMessage>
  </div >);
};

export default FormError;