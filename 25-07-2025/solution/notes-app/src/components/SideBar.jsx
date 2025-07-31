import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Stack
} from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';

const SideBar = ({ notes, onAddNote, onSelectNote, selectedNoteIndex }) => {
  const isNoteSelected = selectedNoteIndex !== null;

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 240 },
        height: { xs: 'auto', sm: '100vh' },
        borderRight: { sm: '1px solid lightgray' },
        borderBottom: { xs: '1px solid lightgray', sm: 'none' },
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* Sticky Add Button for mobile */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          justifyContent: 'flex-end',
          position: 'sticky',
          top: 0,
          background: 'white',
          zIndex: 10,
          pb: 1
        }}
      >
        <IconButton
          variant="soft"
          color="primary"
          aria-label="add"
          onClick={onAddNote}
          disabled={isNoteSelected}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Note List */}
      <Stack
        direction={{ xs: 'row', sm: 'column' }}
        spacing={1}
        sx={{
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          overflowX: { xs: 'auto', sm: 'visible' },
        }}
      >
        {[...notes].reverse().map((note, index) => {
          const actualIndex = notes.length - 1 - index;
          return (
            <ListItem
              key={actualIndex}
              sx={{ width: { xs: 'fit-content', sm: '100%' }, flexShrink: 0 }}
            >
              <ListItemButton sx={{ marginBottom: '10px', padding: '5px' }}
                color="primary"
                variant="solid"
                selected={selectedNoteIndex === actualIndex}
                onClick={() => onSelectNote(actualIndex)}
              >
                <Typography level="body2" noWrap >
                  {note.text.substring(0, 20) || 'Untitled Note'}
                </Typography>
              </ListItemButton>
            </ListItem>
          );
        })}
      </Stack>

      {/* Normal Add Button for desktop */}

      <IconButton sx={{ display: { xs: 'none', sm: 'flex' }, mt: 2, justifyContent: 'center' }}
        variant="soft"
        color="primary"
        aria-label="add"
        onClick={onAddNote}
        disabled={isNoteSelected}
      >
        <AddIcon />
      </IconButton>

    </Box>
  );
};

export default SideBar;
