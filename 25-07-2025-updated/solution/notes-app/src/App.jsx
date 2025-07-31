import { useState, useEffect } from "react";
import { CssBaseline, Drawer } from "@mui/joy";
import SideBar from "./components/SideBar";
import TextArea from "./components/TextArea";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/joy/Button';
import AddIcon from '@mui/icons-material/Add';



const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [currentInput, setCurrentInput] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(false);
  const [noteCreated, setNoteCreated] = useState(false);


  useEffect(() => {
    if (!isTextAreaVisible || currentInput.trim() === "") return;

    const timer = setTimeout(() => {
      if (selectedNoteIndex === null) {

        if (!noteCreated) {
          setNotes((prev) => [{ text: currentInput }, ...prev]);
          setNoteCreated(true);
          setSelectedNoteIndex(0);
        }
      } else {
        setNotes((prev) => {
          const updated = [...prev];
          updated[selectedNoteIndex].text = currentInput;
          return updated;
        });
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [currentInput]);




  // const handleSave = (input) => {
  //   if (selectedNoteIndex === null) {
  //     if (input.trim() !== "") {
  //       setNotes([{ text: input }, ...notes]);
  //       setCurrentInput("");
  //     }
  //   } else {
  //     const updated = [...notes];
  //     updated[selectedNoteIndex].text = input;
  //     setNotes(updated);
  //     setCurrentInput("");
  //     setSelectedNoteIndex(null);
  //   }
  // };

  const handleSelectNote = (index) => {
    setSelectedNoteIndex(index);
    setCurrentInput(notes[index].text);
    setNoteCreated(true);
  };

  const handleDeleteNote = (indexToDelete) => {
    setNotes((prevNotes) => {
      const newNotes = prevNotes.filter((_, i) => i !== indexToDelete);

      // Handle selected note after deletion
      setSelectedNoteIndex((prevIndex) => {
        if (prevIndex === null) return null;
        if (indexToDelete === prevIndex) {
          // Deleted the currently selected note
          setCurrentInput("");
          return null;
        } else if (indexToDelete < prevIndex) {
          // Shift index down by 1
          return prevIndex - 1;
        } else {
          // No change needed
          return prevIndex;
        }
      });

      return newNotes;
    });
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: 'column' }}>


        {/* Header */}
        <AppBar position="static">
          <Toolbar >
            <IconButton onClick={openDrawer}
              sx={{ display: { xs: "inline-flex", sm: "none" }, mr: 2 }}
              edge="start"
              color="inherit"
              aria-label="menu" >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Notes App
            </Typography>
          </Toolbar>
        </AppBar>


        {/* Main */}
        <Box sx={{ display: "flex" }}>

          {/* Mobile Drawer */}
          <Drawer
            open={isDrawerOpen}
            onClose={closeDrawer}
            anchor="left"
            variant="temporary"
          >
            <SideBar
              notes={notes}
              onSelectNote={handleSelectNote}
              onDeleteNote={handleDeleteNote}
              selectedNoteIndex={selectedNoteIndex}
            />
          </Drawer>

          {/* Desktop Sidebar */}
          <Box width={300} p={2}
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            <SideBar
              notes={notes}
              onSelectNote={handleSelectNote}
              onDeleteNote={handleDeleteNote}
              selectedNoteIndex={selectedNoteIndex}
            />
          </Box>

          <Box p={3} width={1}
            sx={{ display: "flex", flexDirection: 'column' }}>
            <Button variant="soft" onClick={() => {
              setIsTextAreaVisible(true);
              setSelectedNoteIndex(null);
              setCurrentInput("");
              setNoteCreated(false);
            }}

              sx={{ ml: "auto", mb: '10px' }}
            >
              <AddIcon />
            </Button>

            {isTextAreaVisible && (
              <TextArea
                input={currentInput}
                onChange={setCurrentInput}
              />
            )}
          </Box>
        </Box>

      </Box>
    </>
  );
};

export default App;
