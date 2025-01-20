import {
  FieldValues,
  UseFormRegister,
  Path,
  FieldErrors,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  label?: string;
  InputType?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors?: FieldErrors<T>;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const FormItem = <T extends FieldValues>({
  label,
  InputType,
  placeholder,
  register,
  name,
  errors,
  Icon,
}: Props<T>) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium">{label}</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {Icon && <Icon className="size-5 text-base-content/40" />}
        </div>
        <input
          type={InputType}
          placeholder={placeholder}
          className={`input input-bordered w-full ${Icon && "pl-10"}`}
          {...register(name)}
        />
      </div>
      {errors && errors[name] && (
        <div className="text-error text-[12px]">
          {errors[name].message as string}
        </div>
      )}
    </div>
  );
};
export default FormItem;
