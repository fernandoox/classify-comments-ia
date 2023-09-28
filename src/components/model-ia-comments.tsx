import { Accordion, AccordionItem, Snippet } from "@nextui-org/react";
import { ModelInterface } from "../interfaces/model-comments";
interface Props {
  modelComments: ModelInterface[];
}
const ModelComments = ({ modelComments }: Props) => {
  return (
    <section className="my-5">
      <Accordion variant="splitted" className="mt-6">
        <AccordionItem
          key="1"
          aria-label="Comments model"
          title="Comments model"
        >
          <Snippet color="default" symbol="">
            <pre> {JSON.stringify(modelComments, undefined, 2)} </pre>
          </Snippet>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default ModelComments;
