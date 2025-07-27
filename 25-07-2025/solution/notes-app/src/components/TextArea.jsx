import { Box, Textarea, ButtonGroup, Button } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

const TextArea = ({ input, onChange, onDelete, onDone, isDisabled }) => {
  return (
    <>
      <Box display="flex" justifyContent="flex-end" gap={1} mb={1}>
        <ButtonGroup variant="soft">
          <Button
            color="success"
            startDecorator={<DoneIcon />}
            disabled={isDisabled}
            onClick={onDone}
          >
            Done
          </Button>
          <Button
            color="danger"
            startDecorator={<DeleteIcon />}
            disabled={isDisabled}
            onClick={onDelete}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Box>

      <Box display="flex" justifyContent="center">
        <Textarea
          value={input}
          onChange={(e) => onChange(e.target.value)}
          minRows={20}
          maxRows={20}
          placeholder="Type your note here..."
          variant="soft"
          sx={{
            width: '500px',
            borderBottom: '2px solid',
            borderColor: 'neutral.outlinedBorder',
            borderRadius: 0,
            '&:hover': {
              borderColor: 'neutral.outlinedHoverBorder',
            },
            '&::before': {
              border: '1px solid var(--Textarea-focusedHighlight)',
              transform: 'scaleX(0)',
              left: 0,
              right: 0,
              bottom: '-2px',
              top: 'unset',
              transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
              borderRadius: 0,
            },
            '&:focus-within::before': {
              transform: 'scaleX(1)',
            },
          }}
        />
      </Box>
    </>
  );
};

export default TextArea;
