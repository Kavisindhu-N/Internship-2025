import { Textarea } from "@mui/joy";

const TextArea = ({ input, onChange, onBlur}) => {
  return (
    <Textarea
      value={input}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => onBlur(input)}  
      minRows={20}
      maxRows={20}
      placeholder="Type your note here..."
      variant="soft"
      sx={{
        width: "100%",
        borderBottom: "2px solid",
        borderColor: "neutral.outlinedBorder",
        borderRadius: 0,
        "&:hover": {
          borderColor: "neutral.outlinedHoverBorder",
        },
        "&::before": {
          border: "1px solid var(--Textarea-focusedHighlight)",
          transform: "scaleX(0)",
          left: 0,
          right: 0,
          bottom: "-2px",
          top: "unset",
          transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
          borderRadius: 0,
        },
        "&:focus-within::before": {
          transform: "scaleX(1)",
        },
      }}
      
    />
  );
};

export default TextArea;
