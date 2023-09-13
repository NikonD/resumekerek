import { Circle, Path, Svg } from "@react-pdf/renderer";

export const UserIcon = () =>
  <Svg  width="64" height="64" viewBox="0 0 64 64">
    <Circle cx="32" cy="32" r="24" fill="#2196F3" />
    <Path fill="#FFFFFF" d="M50,56c-11.1,0-20-8.9-20-20s8.9-20,20-20s20,8.9,20,20S61.1,56,50,56z M50,18c-7.2,0-13,5.8-13,13 s5.8,13,13,13s13-5.8,13-13S57.2,18,50,18z" />
  </Svg>
