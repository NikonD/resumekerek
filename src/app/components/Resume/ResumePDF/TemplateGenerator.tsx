import { Settings } from "lib/redux/settingsSlice"
import React from "react"
import { Simple } from "./Templates/Simple"
import { Resume } from "lib/redux/types"
import { Strict } from "./Templates/Strict"
import { Feature } from "./Templates/Feature"
import { Metro } from "./Templates/Metro"

export const TemplateGenerator = ({
  isPDF,
  resume,
  themeResume,
  themeResumeName,
  formTypeToComponent,
  showFormsOrder,
  profile,
  // allComponents,
  settings
}: {
  isPDF: boolean,
  resume: Resume,
  themeResume: object,
  themeResumeName: string,
  formTypeToComponent: any,
  showFormsOrder: any
  profile: React.FC
  // allComponents: React.Component
  settings: Settings
}) => {
  return (
    <div>
      {
        themeResumeName == "simple" &&
        <Simple
          settings={settings}
          Profile={profile}
          formTypeToComponent={formTypeToComponent}
          showFormsOrder={showFormsOrder}
        />}
      {
        themeResumeName == "strict" &&
        <Strict
          resume={resume}
          settings={settings}
          formTypeToComponent={formTypeToComponent}
          showFormsOrder={showFormsOrder}
          Profile={profile} />}
      {
        themeResumeName == "feature" &&
        <Feature
          isPDF={isPDF}
          resume={resume}
          showFormsOrder={showFormsOrder}
          settings={settings} />
      }
      {
        themeResumeName == "metro" &&
        <Metro
          isPDF={isPDF}
          resume={resume}
          settings={settings}
          showFormsOrder={showFormsOrder} />
      }
    </div>
  )
}

