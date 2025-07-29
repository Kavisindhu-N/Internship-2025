import { useState } from "react";
import { CssBaseline, Box, IconButton, Drawer, Typography } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./components/SideBar";
import TextArea from "./components/TextArea";

const HEADER_HEIGHT = 70; // px

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [currentInput, setCurrentInput] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSave = (input) => {
    if (selectedNoteIndex === null) {
      if (input.trim() !== "") {
        setNotes([{ text: input }, ...notes]);
        setCurrentInput("");
      }
    } else {
      const updated = [...notes];
      updated[selectedNoteIndex].text = input;
      setNotes(updated);
      setCurrentInput("");
      setSelectedNoteIndex(null);
    }
  };

  const handleSelectNote = (index) => {
    setSelectedNoteIndex(index);
    setCurrentInput(notes[index]?.text || "");
    // setIsDrawerOpen(false);
  };

  const handleDeleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);

    if (index === selectedNoteIndex) {
      setSelectedNoteIndex(null);
      setCurrentInput("");
    } 
    else if (index < selectedNoteIndex) {
      setSelectedNoteIndex((prev) => prev - 1);
    }

//     Before:
//   index 0 → Note A
//   index 1 → Note B
//   index 2 → Note C ← selected

// After deletion:
//   index 0 → Note A
//   index 1 → Note C ← now it’s at index 1
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <CssBaseline />

      {/* Header */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: `${HEADER_HEIGHT}px`,
          px: 2,
          display: "flex",
          alignItems: "center",
          boxShadow: "sm",
          bgcolor: "background.surface",
          zIndex: 1300,
        }}
      >
        <IconButton
          onClick={openDrawer}
          sx={{ display: { xs: "inline-flex", sm: "none" }, mr: 1 }}
          aria-label="open sidebar"
        >
          <MenuIcon />
        </IconButton>
        <Typography
          level="h1"
          sx={{
            flex: 1,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Inkdrop
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          mt: `${HEADER_HEIGHT}px`,
          width: "100vw",
          overflow: "hidden",
        }}
      >
        {/* Mobile Drawer */}
        <Drawer
          open={isDrawerOpen}
          onClose={closeDrawer}
          anchor="left"
          variant="temporary"
          // ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              top: `${HEADER_HEIGHT}px`,
              height: `calc(100vh - ${HEADER_HEIGHT}px)`,
              width: 260,
            },
          }}
        >
          <SideBar
            notes={notes}
            onSelectNote={handleSelectNote}
            onDeleteNote={handleDeleteNote}
            selectedNoteIndex={selectedNoteIndex}
          />
        </Drawer>

        {/* Desktop Sidebar */}
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            width: 260,
            borderRight: "1px solid #eee",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
        >
          <SideBar
            notes={notes}
            onSelectNote={handleSelectNote}
            onDeleteNote={handleDeleteNote}
            selectedNoteIndex={selectedNoteIndex}
          />
        </Box>

        {/* TextArea */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            overflow: "auto",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
        >
          <TextArea
            input={currentInput}
            onChange={setCurrentInput}
            onBlur={() => handleSave(currentInput)}
          />
        </Box>
      </Box>
    </>
  );
};

export default App;
