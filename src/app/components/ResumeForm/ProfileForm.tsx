import { BaseForm } from "components/ResumeForm/Form";
import { Input, Textarea } from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeProfile, selectProfile } from "lib/redux/resumeSlice";
import { ResumeProfile } from "lib/redux/types";
import { PhotoUpload } from "./Form/PhotoUpload";
import { useTranslation } from "react-i18next";
import { useIntl } from 'react-intl';
import { useSelector } from "react-redux";
import { selectUser } from "lib/redux/loginSlice";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();

  const user = useSelector(selectUser)

  const { name, email, phone, url, summary, location, photo } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };
  const {t} =  useTranslation()
  console.log()
  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3 max-sm:grid-cols-1">
        <PhotoUpload
          src={photo}
          name="photo"
          onChange={handleProfileChange}
        />
        <Input
          label={t("fullname")}
          labelClassName="col-span-full"
          name="name"
          placeholder=""
          value={name}
          onChange={handleProfileChange}
        />
        <Textarea
          label={t("summary")}
          labelClassName="col-span-full"
          name="summary"
          placeholder=""
          value={summary}
          onChange={handleProfileChange}
        />
        <Input
          label={t("email-label")}
          labelClassName="col-span-4 max-sm:col-span-full"
          name="email"
          placeholder="example@mail.com"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label={t("phone-number-label")}
          labelClassName="col-span-2 max-sm:col-span-full"
          name="phone"
          placeholder="+71234567890"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label={t("website-url-label")}
          labelClassName="col-span-4 max-sm:col-span-full"
          name="url"
          placeholder=""
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label={t("location-label")}
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
