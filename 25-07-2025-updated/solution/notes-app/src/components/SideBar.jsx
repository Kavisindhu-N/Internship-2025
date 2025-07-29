import { Box, ListItemButton, Typography, IconButton, Stack } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SideBar = ({
  notes = [],
  onSelectNote,
  onDeleteNote,
  selectedNoteIndex,
}) => (
  <Box
    sx={{
      width: 240,
      height: "100%",
      p: 2,
      display: "flex",
      flexDirection: "column",
      bgcolor: "background.surface",
    }}
  >
    <Stack spacing={1} sx={{ flex: 1, overflowY: "auto" }}>
      {notes.length === 0 && (
        <Typography level="h4" color="neutral">
          Start creating ....
        </Typography>
      )}
      {notes.map((note, idx) => (
        <ListItemButton
          key={idx}
          color={selectedNoteIndex === idx ? "primary" : "neutral"}
          variant={selectedNoteIndex === idx ? "soft" : "plain"}
          sx={{ borderRadius: 2, px: 1, py: 1 }}
          onClick={() => onSelectNote(idx)}
        >
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              mr: 1,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontWeight: selectedNoteIndex === idx ? 700 : 400,
            }}
          >
            {note.text.substring(0, 30) || "Untitled Note"}
          </Box>
          <IconButton
            aria-label="edit"
            color="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelectNote(idx);
            }}
            sx={{ ml: 1 }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteNote(idx);
            }}
            sx={{ ml: 1 }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </ListItemButton>
      ))}
    </Stack>
  </Box>
);

export default SideBar;
