import { Box, ListItemButton, Typography, IconButton, Stack } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SideBar = ({
  notes = [],
  onSelectNote,
  onDeleteNote,
  selectedNoteIndex,
}) => (
  <Box p={2}>
    <Stack spacing={1} sx={{ overflowY: "auto" }} >
      {notes.length === 0 && (
        <Typography level="h4" color="neutral">
          Start creating ....
        </Typography>
      )}
      {notes.map((note, idx) => (
        <ListItemButton sx={{ display: 'flex', justifyContent: "space-between", width:'250px' }}
          key={idx}
          color={selectedNoteIndex === idx ? "primary" : "neutral"}
          variant={selectedNoteIndex === idx ? "soft" : "plain"}
          onClick={() => onSelectNote(idx)}
        >
          <Typography p={1} noWrap>
              {note.text}
          </Typography>
          <Box sx={{display:'flex'}}>
            <IconButton
              aria-label="edit"
              color="primary"
              size="sm"
              onClick={() => {
                onSelectNote(idx);
              }}

            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="danger"
              size="sm"
              onClick={() => {
                onDeleteNote(idx);
              }}

            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>

        </ListItemButton>
      ))}
    </Stack>
  </Box>
);

export default SideBar;
