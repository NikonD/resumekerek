import { BaseForm } from "components/ResumeForm/Form";
import { Input, Textarea } from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeProfile, selectProfile } from "lib/redux/resumeSlice";
import { ResumeProfile } from "lib/redux/types";
import { PhotoUpload } from "./Form/PhotoUpload";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const { name, email, phone, url, summary, location, photo } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3 max-sm:grid-cols-1">
        <PhotoUpload
          src={photo}
          name="photo"
          onChange={handleProfileChange}
        />
        <Input
          label="ФИО"
          labelClassName="col-span-full"
          name="name"
          placeholder="Ваше имя"
          value={name}
          onChange={handleProfileChange}
        />
        <Textarea
          label="О себе"
          labelClassName="col-span-full"
          name="summary"
          placeholder=""
          value={summary}
          onChange={handleProfileChange}
        />
        <Input
          label="Email"
          labelClassName="col-span-4 max-sm:col-span-full"
          name="email"
          placeholder="example@mail.com"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Номер телефона"
          labelClassName="col-span-2 max-sm:col-span-full"
          name="phone"
          placeholder="(123)456-7890"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="Website"
          labelClassName="col-span-4 max-sm:col-span-full"
          name="url"
          placeholder="linkedin.com/in/khanacademy"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="Местонахождение"
          labelClassName="col-span-2 max-sm:col-span-full"
          name="location"
          placeholder="NYC, NY"
          value={location}
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  );
};
