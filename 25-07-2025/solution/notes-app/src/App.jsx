import { CssBaseline, Box, Sheet } from '@mui/joy';
import { useState } from 'react';
import SideBar from './components/SideBar';
import TextArea from './components/TextArea';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  const handleAddNote = () => {
    if (currentInput.trim()) {
      const newNotes = [...notes, { text: currentInput }];
      setNotes(newNotes);
      setCurrentInput('');
      setSelectedNoteIndex(null);
    }
  };

  const handleDeleteNote = () => {
    if (selectedNoteIndex !== null) {
      const newNotes = notes.filter((_, i) => i !== selectedNoteIndex);
      setNotes(newNotes);
      setSelectedNoteIndex(null);
      setCurrentInput('');
    }
  };

  const handleDone = () => {
    setSelectedNoteIndex(null);
    setCurrentInput('');
  };

  const handleSelectNote = (index) => {
    setSelectedNoteIndex(index);
    setCurrentInput(notes[index].text);
  };

  const handleChange = (value) => {
    setCurrentInput(value);
    if (selectedNoteIndex !== null) {
      const updated = [...notes];
      updated[selectedNoteIndex].text = value;
      setNotes(updated);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          height: '100vh',
        }}
      >
        <SideBar
          notes={notes}
          onAddNote={handleAddNote}
          onSelectNote={handleSelectNote}
          selectedNoteIndex={selectedNoteIndex}
        />
        <Sheet
          sx={{
            flex: 1,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          <TextArea
            input={currentInput}
            onChange={handleChange}
            onDelete={handleDeleteNote}
            onDone={handleDone}
            isDisabled={selectedNoteIndex === null}
          />
        </Sheet>
      </Box>
    </>
  );
};

export default App;
