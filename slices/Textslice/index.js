import { PrismicRichText } from "@prismicio/react";
import Button from "@/components/Button";

/**
 * @typedef {import("@prismicio/client").Content.TextsliceSlice} TextsliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TextsliceSlice>} TextsliceProps
 * @param {TextsliceProps}
 */
const Textslice = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="py-24 gap-16 inline-flex flex-col items-center text-center w-screen bg-greenGrey">
        <div className="container gap-6 flex flex-col items-center">
          <PrismicRichText field={slice.primary.title} />
          <PrismicRichText field={slice.primary.text_field} />
          {slice.variation === 'callToActionButton' && ( <Button link={slice.primary.buttonlink} label={slice.primary.button_label} /> )}
        </div>
      </div>
    </section>
  );
};

export default Textslice;
