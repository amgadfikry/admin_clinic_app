import { BiLogoGithub } from 'react-icons/bi'
import SectionHeader from '../components/sectionHeader'

const insuranceCompanies = [
  { 'id': 1, 'logo': <BiLogoGithub />, 'name': 'Company 1' },
  { 'id': 2, 'logo': <BiLogoGithub />, 'name': 'Company 2' },
  { 'id': 3, 'logo': <BiLogoGithub />, 'name': 'Company 3' },
  { 'id': 4, 'logo': <BiLogoGithub />, 'name': 'Company 4' },
  { 'id': 5, 'logo': <BiLogoGithub />, 'name': 'Company 5' },
]

function Insurance() {
  return (
    <section className="pt-16 pb-12 px-2 bg-gray-color">
      <div className="container mx-auto ">
        <SectionHeader span='Insurance' title='Companies'
          paragraph='Diffrent insurance companies with our clinic' />
        <div className='flex items-center justify-center space-x-5 md:space-x-12 flex-wrap'>
          {insuranceCompanies.map((company) => {
            return (
              <div className="flex flex-col items-center opacity-80 mb-5  text-dark-color" key={company.id}>
                <div className='text-4xl ls:text-5xl'>
                  {company.logo}
                </div>
                <h4 className='text-light text-base lg:text-lg'>{company.name}</h4>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Insurance