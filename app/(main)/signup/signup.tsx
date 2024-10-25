"use client";
import { Button } from "@/app/components/button";
import { F, Input } from "@/app/components/form";
import { Line } from "@/app/components/line";
import { Steps } from "@/app/components/steps";
import {
  FormHeader,
  GenericHeader,
  Small,
  Subtle,
} from "@/app/components/text";
import { signupEmail } from "@/app/lib/request";
import { Role } from "@/app/lib/types";

import { FormikErrors } from "formik";
import { ArrowRight } from "lucide-react";

export function SignupProcess() {
  return (
    <Steps>
      {({ forward }) => [
        <F
          initialValues={{
            email: "",
            username: "",
            role: "NORMAL" as Role,
          }}
          onSubmit={async ({ email, username }, { setErrors }) => {
            let data = await signupEmail({
              email,
              username,
            });

            let json = await data.json();

            if (json.errors) setErrors(json.errors);
            else forward();
          }}
          validate={async (values) => {
            let errors = {} as FormikErrors<typeof values>;

            if (!values.email) errors.email = "An email is required";
            else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            )
              errors.email = "Weird email address";

            if (!values.username) errors.username = "A username is required";

            return errors;
          }}
        >
          {({
            handleSubmit,
            handleBlur,
            handleChange,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <form className="flex flex-col h-full" onSubmit={handleSubmit}>
              <div className="flex items-center">
                <Line className="flex-1" />{" "}
                <FormHeader className="ml-4">Sign up</FormHeader>
              </div>
              <div className="grid gap-4 mt-4">
                <div className="w-full">
                  <Input
                    id="email"
                    placeholder="Email"
                    className="w-full"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    invalid={Boolean(errors.email) && touched.email}
                  />
                  <Small className="text-destructive first-letter:uppercase">
                    {touched.email && errors.email}
                  </Small>
                </div>
                <div className="w-full">
                  <Input
                    id="username"
                    placeholder="Username"
                    className="w-full"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    invalid={Boolean(errors.username) && touched.username}
                  />
                  <Small className="text-destructive first-letter:uppercase">
                    {touched.username && errors.username}
                  </Small>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full mt-auto min-h-12"
                variant="seethru"
                loading={isSubmitting}
              >
                Continue <ArrowRight className="ml-1 w-3" />
              </Button>
            </form>
          )}
        </F>,
        <Subtle className="text-center">
          Click the link in the email that was sent to your inbox.
        </Subtle>,
      ]}
    </Steps>
  );
}
