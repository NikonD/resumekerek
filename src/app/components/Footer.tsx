
import { useTranslation } from "react-i18next"
import config from '../../../config/config.json'
export const Footer = () => {

  const {t, i18n} = useTranslation()

  return (
    <footer style={{width: "100%"}} className="releative bottom-0 bg-gray-800 py-10 text-white">
      <div className="container mx-auto max-sm:pl-15 max-sm:pr-15 text-center flex flex-col md:flex-row  justify-around  ">

        <div className="flex flex-col items-start">
          <p>Tamasha Trade Company</p>
          <p>Tel: +7 776 875 4857</p>
          <p>Email: tamashatradeco@gmail.com</p>
        </div>
        <div className="flex flex-col items-start">
          <p>
            <a target="_blank" href={`${config.API_URL}/pub/policy_${i18n.language}.pdf`} className="text-blue-300 hover:text-blue-500">{t('private-policy')}</a>
          </p>
          <p>
            <a target="_blank" href={`${config.API_URL}/pub/offer_${i18n.language}.pdf`} className="text-blue-300 hover:text-blue-500">{t('offer')}</a>
          </p>
        </div>
      </div>
      <div className="pt-5 md:flex-row md:justify-between text-center">
        <p>&copy; 2023 Tamasha Trade Company</p>
      </div>
    </footer>
  )
}