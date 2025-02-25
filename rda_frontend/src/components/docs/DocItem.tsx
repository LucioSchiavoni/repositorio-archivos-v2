import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote} from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { useEffect, useState } from "react";
import { generateDocx } from "../utils/generateDocx";
import { FiDownload } from "react-icons/fi";
import { Tooltip } from "@chakra-ui/react";


interface DocItemProps {
  onChange: (value: string) => void;
  initialContent?: string | null;
}

const DocItem = ({ onChange, initialContent = "[]" }: DocItemProps) => {
  // Initialcontent es un JSON valido y no es null
  let initialBlocks: Block[] = [];

  
  try {
    initialBlocks = initialContent  ? (JSON.parse(initialContent) as Block[]) : []
  } catch (e) {
    console.error("Failed to parse initialContent:", e);
    initialBlocks = []; // devolver un array vacio
  }

  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);

  const editor = useCreateBlockNote({
    initialContent: blocks.length > 0 ? blocks : [{type: "heading", content:"Hola mundo"}]
 });

  useEffect(() => {
    onChange(JSON.stringify(blocks));
  }, [blocks, onChange]);


  
  return (
  <>
  <Tooltip label="Descargar documento word">
  <button className="px-3 text-xl rounded-md  text-black hover:border  absolute top-[6.8rem] right-52 hover:bg-white h-7 flex gap-2 items-center" onClick={() => generateDocx(blocks)}>Descargar <span><FiDownload /> </span></button>
  </Tooltip> 
   <BlockNoteView
    className="border w-9/12 p-4 mb-40 m-auto rounded-md"
      editor={editor}
      onChange={() => {
        setBlocks(editor.document);
      }}
      theme="light"
    />
      
     </>
  );
};

export default DocItem;

