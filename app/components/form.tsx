"use client";
import { Button, variants } from "@/app/components/button";
import {
  Input as I,
  Select as S,
  Textarea as T,
  Switch as Sw,
  Radio as Ra,
} from "@headlessui/react";
import {
  FormikConfig,
  FormikErrors,
  FormikProps,
  FormikValues,
  useFormik,
} from "formik";
import { ChevronsUpDown } from "lucide-react";
import { forwardRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface FProps<T extends FormikValues>
  extends Omit<FormikConfig<T>, "onSubmit"> {
  children(props: FormikProps<T>): React.ReactNode;
  validate?(values: T): FormikErrors<T> | Promise<FormikErrors<T>>;
  onSubmit?: FormikConfig<T>["onSubmit"];
  delay?: number;
}

export function F<T extends FormikValues>({
  children,
  delay = 350,
  validateOnBlur = false,
  validateOnChange = false,
  validateOnMount = true,
  onSubmit = () => {},
  ...props
}: FProps<T>) {
  if (!props.validate)
    props.validate = (..._: any[]) => {
      return {};
    };

  let output = useFormik({
    validateOnBlur: true,
    validateOnChange: false,
    validateOnMount: true,
    initialErrors: {},
    onSubmit,
    ...props,
  });

  useEffect(() => {
    let timeout = setTimeout(
      async () => await output.validateForm(output.values),
      delay
    );
    return () => clearTimeout(timeout);
  }, [output.values]);

  return children(output);
}

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  type?: React.HTMLInputTypeAttribute;
  invalid?: boolean;
}

interface TextareaProps extends React.ComponentPropsWithoutRef<"textarea"> {
  invalid?: boolean;
}

export let Input = forwardRef<React.ComponentRef<"input">, InputProps>(
  ({ className, invalid = false, ...props }, ref) => (
    <I
      data-invalid={invalid}
      aria-invalid={invalid}
      className={twMerge(
        "shadow-sm font-light text-[15px] border border-faint data-[invalid=true]:border-destructive data-[invalid=true]:focus:border-destructive data-[invalid=true]:text-destructive",
        "data-[invalid=true]:placeholder-destructive/50 focus:outline-outline bg-transparent placeholder-muted rounded-lg px-1.5 py-1 outline-none !outline-offset-1",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

export let Select = forwardRef<
  React.ComponentRef<"select">,
  React.ComponentPropsWithoutRef<"select">
>(({ className, ...props }, ref) => (
  <div
    className={twMerge(
      "relative border border-faint rounded min-w-64 shadow",
      className
    )}
  >
    <S
      className="appearance-none bg-transparent focus:outline-none p-0.5 pl-1.5 w-full"
      ref={ref}
      {...props}
    />
    <ChevronsUpDown className="size-4 absolute right-1 top-1.5" />
  </div>
));

export let Textarea = forwardRef<React.ComponentRef<"textarea">, TextareaProps>(
  ({ className, invalid = false, ...props }, ref) => (
    <T
      data-invalid={invalid}
      aria-invalid={invalid}
      autoComplete="off"
      className={twMerge(
        "shadow-sm font-light text-[15px] resize-none border border-faint data-[invalid=true]:border-destructive data-[invalid=true]:focus:border-destructive data-[invalid=true]:text-destructive",
        "data-[invalid=true]:placeholder-destructive/50 bg-transparent focus:outline-outline placeholder-muted rounded-lg px-1.5 py-1 outline-none !outline-offset-1",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

export let Switch = forwardRef<
  React.ComponentRef<typeof Sw>,
  React.ComponentPropsWithoutRef<typeof Sw> & { className?: string }
>(function ({ className, ...props }, ref) {
  return (
    <Sw
      ref={ref}
      className={twMerge(
        "group relative shadow flex h-5 w-10 cursor-pointer bg-primary/10 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-outline",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-3 translate-x-0 rounded-full bg-white ring-0 shadow transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
      />
    </Sw>
  );
});

export let Radio = forwardRef<
  React.ComponentRef<typeof Ra>,
  React.ComponentPropsWithoutRef<typeof Ra> & {
    variant?: keyof typeof variants;
    className?: string;
  }
>(function ({ children, className, ...props }, ref) {
  return (
    <Ra
      className={twMerge(
        "outline-outline outline-2 rounded-lg data-[checked]:outline outline-offset-1",
        className
      )}
      as={Button}
      //@ts-ignore
      type="button"
      ref={ref}
      {...props}
    >
      {children}
    </Ra>
  );
});
