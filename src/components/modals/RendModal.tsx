"use client";

import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

import useRentModal from "@/hooks/useRentModal";

import ModalLayout from "./ModalLayout";
import Heading from "../Heading";
import { CATEGORIES } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const formSchema = z.object({
  category: z.string(),
  location: z
    .object({
      value: z.string(),
      flag: z.string(),
      label: z.string(),
      latlng: z.array(z.number()),
      region: z.string(),
    })
    .nullable(),
  guestCount: z.number(),
  roomCount: z.number(),
  bathroomCount: z.number(),
  imageSrc: z.string(),
  price: z.coerce.number().min(1),
  title: z.string().min(2),
  description: z.string().min(2),
});

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = form.watch("category");
  const location = form.watch("location");
  const guestCount = form.watch("guestCount");
  const roomCount = form.watch("roomCount");
  const bathroomCount = form.watch("bathroomCount");
  const imageSrc = form.watch("imageSrc");

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const setCustomValue = (id: keyof z.infer<typeof formSchema>, value: any) => {
    form.setValue(id, value, {
      shouldValidate: true, // important
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    if (step <= STEPS.CATEGORY) return;
    setStep((value) => value - 1);
  };

  const onNext = () => {
    if (step >= STEPS.PRICE) return;
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    console.log(values);

    setIsLoading(true);
    axios
      .post("api/listings", values)
      .then(() => {
        toast.success("Listing Created!");
        router.refresh();
        form.reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => toast.error("Something went wrong."))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onInvalide = () => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subTitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {CATEGORIES.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step == STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subTitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChage={(value) => setCustomValue("location", value)}
        />
        <div className="h-[35vh] rounded-lg overflow-hidden">
          <Map center={location?.latlng} />
        </div>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basic about your place"
          subTitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subTitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subTitle="How many rooms do you allow?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subTitle="How many bathrooms do you allow?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subTitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you dsecribe your place?"
          subTitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          register={form.register}
          value={form.watch("title")}
          disabled={isLoading}
          errors={form.formState.errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          register={form.register}
          disabled={isLoading}
          errors={form.formState.errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Set your price"
          subTitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          type="number"
          register={form.register}
          value={form.watch("price").toString()}
          disabled={isLoading}
          errors={form.formState.errors}
          formatPrice
          required
        />
      </div>
    );
  }

  return (
    <ModalLayout
      title="Add your clonebnb home"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={form.handleSubmit(onSubmit, onInvalide)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
