import Image from "next/image";
import Link from "next/link";
import ImageNurse from "@public/contact/image-nurse.png";
import ImageHospital from "@public/contact/image-hospital.png";
import ImagePublic from "@public/contact/image-public.png";
import {
  ContactPanel,
  ContactPanelItem,
  ContactPanelTitle,
  ContractPanelContent,
} from "./contact-panel";
import {
  ContactCard,
  ContactCardImage,
  ContactCardRedirect,
  ContactCardTitle,
  ContactCardTitleEmphasized,
} from "./contact-card";

export const ContactComposite = () => {
  return (
    <ContactPanel>
      <ContactPanelTitle>お問い合わせフォーム</ContactPanelTitle>
      {/* Note: Hidden as per Seima's request */}
      {/* <ContactPanelSubTitle>
        文字の大きさ、量、字間、行間等を確認するため
      </ContactPanelSubTitle> */}
      <ContractPanelContent>
        <ContactPanelItem>
          <ContactCard>
            <ContactCardImage
              image={<Image src={ImageNurse} alt="nurse" fill sizes="100%" />}
            />
            <ContactCardTitle>
              <span>
                <ContactCardTitleEmphasized className="text-pink-200">
                  看護師の方
                </ContactCardTitleEmphasized>
                は
              </span>
              こちらから
            </ContactCardTitle>
            {/* Note: Hidden as per Seima's request */}
            {/* <ContactCardDescription>
              文字の大きさ、量、字間、行間等を確認するため
            </ContactCardDescription> */}
            <ContactCardRedirect
              className="bg-pink-200 font-bold hover:bg-pink-200"
              link={<Link href="/contact-nurse">お問い合わせ</Link>}
            />
          </ContactCard>
        </ContactPanelItem>
        <ContactPanelItem>
          <ContactCard>
            <ContactCardImage
              image={
                <Image src={ImageHospital} alt="hospital" fill sizes="100%" />
              }
            />
            <ContactCardTitle>
              <span>
                <ContactCardTitleEmphasized className="text-green-200">
                  医療機関の方
                </ContactCardTitleEmphasized>
                は
              </span>
              こちらから
            </ContactCardTitle>
            {/* Note: Hidden as per Seima's request */}
            {/* <ContactCardDescription>
              文字の大きさ、量、字間、行間等を確認するため
            </ContactCardDescription> */}
            <ContactCardRedirect
              className="bg-green-200 font-bold hover:bg-green-200"
              link={<Link href="/contact-hospital">お問い合わせ</Link>}
            />
          </ContactCard>
        </ContactPanelItem>
        <ContactPanelItem className="border-b-0 lg:border-r-0">
          <ContactCard>
            <ContactCardImage
              image={<Image src={ImagePublic} alt="public" fill sizes="100%" />}
            />
            <ContactCardTitle>
              <span>
                <ContactCardTitleEmphasized className="text-blue-300">
                  一般の方は
                </ContactCardTitleEmphasized>
                は
              </span>
              こちらから
            </ContactCardTitle>
            {/* Note: Hidden as per Seima's request */}
            {/* <ContactCardDescription>
              文字の大きさ、量、字間、行間等を確認するため
            </ContactCardDescription> */}
            <ContactCardRedirect
              className="bg-blue-300 font-bold hover:bg-blue-300"
              link={<Link href="/contact">お問い合わせ</Link>}
            />
          </ContactCard>
        </ContactPanelItem>
      </ContractPanelContent>
    </ContactPanel>
  );
};
