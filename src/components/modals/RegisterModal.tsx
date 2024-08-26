"use client";

import React, { useCallback, useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import ModalLayout from "./ModalLayout";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
});

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values) => {
    setIsLoading(true);

    axios
      .post("/api/register", values)
      .then(() => {
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch(() => {
        toast.error("Somting went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Clonebnb" subTitle="Create an account!" />
      <Input
        id="email"
        label="email"
        disabled={isLoading}
        register={form.register}
        errors={form.formState.errors}
        required
      />
      <Input
        id="name"
        label="name"
        disabled={isLoading}
        register={form.register}
        errors={form.formState.errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="password"
        disabled={isLoading}
        register={form.register}
        errors={form.formState.errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light ">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ModalLayout
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
