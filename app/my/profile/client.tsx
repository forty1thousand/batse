"use client";
import { Button } from "@/app/components/button";
import { F, Input, Switch } from "@/app/components/form";
import { Line } from "@/app/components/line";
import { LocalState } from "@/app/components/localstate";
import { Modal } from "@/app/components/modal";
import { GenericHeader, Small, Subtle } from "@/app/components/text";
import { beautifulDate } from "@/app/lib/date";
import { updateProfile } from "@/app/lib/request";
import { User } from "@/app/lib/types";
import { useRouter } from "next/navigation";

export function Client({ data }: { data: User }) {
  let router = useRouter();
  return (
    <F
      initialValues={{
        name: data.name ?? "",
        email: data.email ?? "",
        city: data.city ?? "",
        tags: data.tags ?? "",
      }}
      onSubmit={async ({ ...values }) => {
        try {
          await new Promise((resolve) => void setTimeout(resolve, 500));

          await updateProfile({
            city: values.city || null,
            name: values.name || null,
            email: values.email,
            tags: values.tags.length ? values.tags : null,
          });

          router.refresh();
        } catch (e) {}
      }}
    >
      {({
        values,
        handleBlur,
        handleChange,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
      }) => (
        <form className="flex-1 p-4 md:mx-16 lg:mx-36" onSubmit={handleSubmit}>
          <GenericHeader>Public information</GenericHeader>
          <Subtle>
            This information except your email is publicly shared.
          </Subtle>
          <Line className="my-4" />
          <div className="grid gap-2">
            <div className="grid md:grid-cols-[1fr_2fr] gap-x-4 gap-y-4">
              <label htmlFor="name">
                <GenericHeader className="text-lg">Name</GenericHeader>
                <Subtle>Your name is attached to things</Subtle>
              </label>
              <div>
                <Input
                  id="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  invalid={touched.name && Boolean(errors.name)}
                  placeholder="Name"
                  className="h-fit w-full"
                />
                <Small className="text-destructive first-letter:uppercase">
                  {touched.name && errors.name}
                </Small>
              </div>
            </div>
          </div>
          <Line className="my-4" />
          <div className="grid md:grid-cols-[1fr_2fr] gap-x-4 gap-y-4">
            <label htmlFor="email">
              <GenericHeader className="text-lg">Email</GenericHeader>
              <Subtle className="">
                Emails will be sent to your new address
              </Subtle>
            </label>
            <div>
              <Input
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                invalid={touched.email && Boolean(errors.email)}
                placeholder="Email"
                className="h-fit w-full"
              />
              <Small className="text-destructive first-letter:uppercase">
                {touched.email && errors.email}
              </Small>
            </div>
          </div>
          <Line className="my-4" />
          <div className="grid md:grid-cols-[1fr_2fr] gap-x-4 gap-y-4">
            <label htmlFor="city">
              <GenericHeader className="text-lg">City</GenericHeader>
              <Subtle>
                {data.role !== "NORMAL"
                  ? "This city is used for search purposes"
                  : "This city will be shared with appointers"}
              </Subtle>
            </label>
            <div className="w-full">
              <Input
                id="city"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                invalid={touched.city && Boolean(errors.city)}
                placeholder="City"
                className="h-fit w-full"
              />
              <Small className="text-destructive first-letter:uppercase">
                {touched.city && errors.city}
              </Small>
            </div>
          </div>
          {data.role !== "NORMAL" && (
            <>
              <Line className="my-4" />
              <div className="grid md:grid-cols-[1fr_2fr] gap-x-4 gap-y-4">
                <label htmlFor="tags">
                  <GenericHeader className="text-lg">Tags</GenericHeader>
                  <Subtle>General information about what you do</Subtle>
                </label>
                <div className="w-full">
                  <Input
                    id="tags"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tags}
                    invalid={touched.tags && Boolean(errors.tags)}
                    placeholder="Tags"
                    className="h-fit w-full"
                  />
                  <Small className="text-destructive first-letter:uppercase">
                    {touched.city && errors.city}
                  </Small>
                </div>
              </div>
            </>
          )}
          <Line className="my-4" />
          <div className="flex gap-4">
            <Button loading={isSubmitting} type="submit" variant="seethru">
              Submit
            </Button>
            <LocalState initialState={false}>
              {(open, setOpen) => (
                <>
                  <Button
                    type="button"
                    variant="text"
                    onClick={() => setOpen(true)}
                    className="ml-auto order-first"
                  >
                    Information
                  </Button>
                  <Modal open={open} closeModal={setOpen}>
                    <GenericHeader>Account information</GenericHeader>
                    <Subtle className="text-left">
                      Joined on {beautifulDate(data.created_at)} <br />
                      Last updated on {beautifulDate(data.updated_at)} <br />
                    </Subtle>
                  </Modal>
                </>
              )}
            </LocalState>
          </div>
        </form>
      )}
    </F>
  );
}
