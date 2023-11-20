
import { useTranslation } from "react-i18next"
import config from '../../../config/config.json'
import Link from "next/link"
export const Footer = () => {

  const {t, i18n} = useTranslation()

  return (
    <footer style={{width: "100%"}} className="mx-auto max-w-screen bg-dot px-8 lg:px-12 overflow-x-hidden relative bottom-0 py-10 text-black mt-auto items-center flex flex-col">
      <div className="container mx-auto max-sm:pl-15 max-sm:pr-15 text-center flex flex-col md:flex-row  justify-around  ">
{/* 
        <div className="flex flex-col lg:items-start items-center text-black">
          <p>Tamasha Trade Company</p>
          <p>Tel: +7 776 875 4857</p>
          <p>Email: tamashatradeco@gmail.com</p>
        </div>
        <div className="flex flex-col items-start">
          <p>
            <a target="_blank" href={`${config.API_URL}/pub/policy_${i18n.language}.pdf`} className=" hover:text-[#722ED1] text-black">{t('private-policy')}</a>
          </p>
          <p>
            <a target="_blank" href={`${config.API_URL}/pub/offer_${i18n.language}.pdf`} className=" hover:text-[#722ED1] text-black">{t('offer')}</a>
          </p>
          <p>
            <a target="_blank" href={`/about`} className="text-black hover:text-[#722ED1]">{t('about')}</a>
          </p>
        </div>
      </div>
      <div className="pt-5 md:flex-row md:justify-between text-center text-black">
        <p>&copy; 2023 Tamasha Trade Company</p>
      </div> */}

<div className="flex flex-row justify-between w-full items-center py-3  border-y border-border">
<div className="flex flex-col items-start">
<span className="whitespace-nowrap text-2xl font-semibold  mb-2">Resume Kerek</span>


</div>

            <ul className="flex flex-row gap-3  ">
              <li className="px-3 hover:text-[#722ED1]">
                <Link href="/">Главная</Link>
              </li>
              <li className="px-3 hover:text-[#722ED1]">
                <Link href={`${config.API_URL}/pub/offer_${i18n.language}.pdf`}>{t('offer')}</Link>
              </li>
              <li className="px-3 hover:text-[#722ED1]">
                <Link href="payment">{t("payment")}</Link>
              </li>
            
              <li className="px-3 hover:text-[#722ED1]">
                <Link href={`/about`}>{t('about')}</Link>
              </li>
            
            </ul>
           
          </div>
          </div>
          <div className="flex flex-col gap-3 max-w-2xl w-full justify-center items-center">
          <div className="flex pt-6  flex-row gap-6 lg:items-start items-cente">
          <p>Tamasha Trade Company</p>
          <p>Tel: +7 776 875 4857</p>
          <p>Email: tamashatradeco@gmail.com</p>
        </div>
          <div className="flex  flex-row gap-3 items-center justify-center">            <span className="text-sm font-semibold">
              © 2023 Tamasha Trade Company
            </span>
            <a  href={`${config.API_URL}/pub/policy_${i18n.language}.pdf`}  className="hover:text-[#722ED1] text-sm text-primary_100">
            {t('private-policy')}
            </a>
          </div>
        </div>

    </footer>
  )
}