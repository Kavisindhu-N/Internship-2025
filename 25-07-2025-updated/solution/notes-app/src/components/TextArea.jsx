import { Textarea} from "@mui/joy";


const TextArea = ({ input, onChange }) => {
  return (
    <>
      
      <Textarea
        value={input}
        onChange={(e) => onChange(e.target.value)}
        minRows={20}
        maxRows={20}
        placeholder="Type your note here..."
        variant="soft"
      />
    </>
  );
};

export default TextArea;
