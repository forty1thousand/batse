"use client";
import { GenericHeader, Label, Small, Subtle } from "@/app/components/text";
import { User } from "@/app/lib/types";
import { Button } from "@/app/components/button";
import { LinkIcon, Plus } from "lucide-react";
import { LocalState } from "@/app/components/localstate";
import { Modal } from "@/app/components/modal";
import { F, Input } from "@/app/components/form";
import { createWorker, deleteWorker } from "@/app/lib/request";
import { FormikValues } from "formik";
import { useRouter } from "next/navigation";
import { Face } from "@/app/components/face";
import { Link } from "@/app/components/link";

export default function ({
  workers,
  city,
  tags,
  totalAppointments,
}: {
  workers: User[];
  city: string | null;
  tags: string | null;
  totalAppointments: number;
}) {
  let router = useRouter();

  return (
    <>
      <div className="flex mb-4">
        <GenericHeader>Workers</GenericHeader>
        <LocalState initialState={false}>
          {(state, setState) => (
            <>
              <Button className="ml-auto" onClick={setState.bind(null, true)}>
                <Plus className="size-4 mr-2" /> Add Worker
              </Button>
              <Modal open={state} closeModal={setState}>
                <F
                  initialValues={{
                    email: "",
                    username: "",
                    name: "",
                    city: city ?? "",
                    tags: tags ?? "",
                  }}
                  onSubmit={async (values, { setErrors }) => {
                    try {
                      let res = (await (await createWorker(values)).json()) as {
                        errors?: FormikValues;
                      };
                      setErrors(res.errors ?? {});
                      if (!res.errors) setState(false);
                      router.refresh();
                    } catch {}
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
                    <form
                      className="grid grid-cols-2 w-80 gap-4"
                      onSubmit={handleSubmit}
                    >
                      <div className="col-span-2 mb-8">
                        <GenericHeader>Create a worker</GenericHeader>
                        <Subtle>You can update these values any time.</Subtle>
                      </div>
                      <div className="w-full flex flex-col">
                        <Label htmlFor="email" className="font-medium mr-auto">
                          Email
                        </Label>
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
                      <div className="w-full flex flex-col">
                        <Label
                          className="font-medium mr-auto"
                          htmlFor="username"
                        >
                          Username
                        </Label>
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
                      <div className="w-full flex flex-col col-span-2">
                        <Label className="font-medium mr-auto" htmlFor="name">
                          Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Name"
                          className="w-full"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          invalid={Boolean(errors.name) && touched.name}
                        />
                        <Small className="text-destructive first-letter:uppercase">
                          {touched.name && errors.name}
                        </Small>
                      </div>
                      <div className="w-full flex flex-col col-span-2">
                        <Label className="font-medium mr-auto" htmlFor="city">
                          City
                        </Label>
                        <Input
                          id="city"
                          placeholder="City"
                          className="w-full"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.city}
                          invalid={Boolean(errors.city) && touched.city}
                        />
                        <Small className="text-destructive first-letter:uppercase">
                          {touched.city && errors.city}
                        </Small>
                      </div>
                      <div className="w-full flex flex-col col-span-2">
                        <Label className="font-medium mr-auto" htmlFor="tags">
                          Tags
                        </Label>
                        <Input
                          id="tags"
                          placeholder="Tags"
                          className="w-full"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.tags}
                          invalid={Boolean(errors.tags) && touched.tags}
                        />
                        <Small className="text-destructive first-letter:uppercase">
                          {touched.tags && errors.tags}
                        </Small>
                      </div>
                      <div className="flex w-full gap-x-4 mt-16 col-span-2">
                        <Button
                          className="flex-1"
                          type="button"
                          onClick={setState.bind(null, false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="flex-1"
                          variant="outline"
                          loading={isSubmitting}
                        >
                          Create
                        </Button>
                      </div>
                    </form>
                  )}
                </F>
              </Modal>
            </>
          )}
        </LocalState>
      </div>
      <div className="flex gap-x-4">
        <div className="flex-1 p-4 border border-faint rounded-lg">
          <Subtle>Workers</Subtle>
          <p>{workers.length}</p>
        </div>
        <div className="flex-1 p-4 border border-faint rounded-lg">
          <Subtle>Total appointments</Subtle>
          <p>{totalAppointments}</p>
        </div>
      </div>
      <div className="grid grid-cols-1">
        {workers.length ? (
          workers.map((w) => (
            <div
              key={w.username}
              className="p-4 border-b border-faint flex items-center gap-x-4"
            >
              <Face name={w.name ?? w.username} href={`/at/${w.username}`} />
              <Link href={`/book/${w.username}`} gray>
                {w.name ?? w.username}
              </Link>
              <Button
                className="ml-auto"
                title="Copy booking link"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_BASE_URL!}/book/${w.username}`
                  );
                }}
                variant="text"
              >
                <LinkIcon className="size-4" />
              </Button>
              <LocalState initialState={[false, false] as [boolean, boolean]}>
                {([state, loading], setState) => (
                  <>
                    <Button
                      onClick={setState.bind(null, [true, loading])}
                      className="p-1"
                      variant="destructive"
                    >
                      Delete
                    </Button>
                    <Modal className="w-80" open={state} closeModal={setState}>
                      <p className="text-lg font-semibold">Are you sure?</p>
                      <Subtle className="mb-10">
                        You can't go back and you will lose all associated
                        appointments.
                      </Subtle>
                      <div className="flex gap-x-4">
                        <Button
                          onClick={setState.bind(null, [false, loading])}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={async () => {
                            setState([state, true]);
                            await deleteWorker(w.username);
                            setState([false, false]);
                            router.refresh();
                          }}
                          className="flex-1"
                          loading={loading}
                          variant="destructive"
                        >
                          Yes
                        </Button>
                      </div>
                    </Modal>
                  </>
                )}
              </LocalState>
            </div>
          ))
        ) : (
          <Small className="mt-2">You have no workers, add some?</Small>
        )}
      </div>
    </>
  );
}
