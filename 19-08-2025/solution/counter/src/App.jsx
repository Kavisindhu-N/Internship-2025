import { useState, useEffect } from 'react'
import { TextField, Button, IconButton, Box, Stack, Paper } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const App = () => {

  const steps = [];

  const [userInput, setUserInput] = useState('')
  const [count, setCount] = useState('')
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setCount(userInput);
  }, [userInput]);


  const handleInputChange = (e) => {
    // if (isNaN(e.target.value) || e.target.value === '') {
    //   alert('Please input a number');
    //   return;
    // }
    setUserInput(Number(e.target.value));
  }

  const handleIncrementButtonClick = () => {
    setCount(prev => prev + userInput);
    // console.log('state count', count) -------->not re-rerendered so old value
  }
  console.log('state count', count)


  const handleDecrementButtonClick = () => {
    setCount(prev => prev - userInput)
    // console.log(count) -------->not re-rerendered so old value
  }
  console.log(count)

  const handleReset = () => {
    setUserInput('')
  }

  for (let i = 1; i <= count; i++) {
    steps.push(`Step ${i}`)
  }

  return (

    <Box sx={{
      p: 2, 
      borderRadius: "12px",
      boxShadow: 3,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem',
    }}
      width={'50rem'}
      height={'20rem'}>

      <Paper
        elevation={1}
        sx={{
          p: 3,
          width: '45rem',
          minHeight: '7rem',
          borderRadius: '12px',
          overflowY: 'auto'
        }}>

        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ flexWrap: 'wrap' }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Stack
        direction="row"
        spacing={2}
        mt={1}
        width={'45rem'}
        sx={{ alignItems: "center" }} >

        <TextField
          id="outlined-basic"
          label="Enter step size"
          variant="outlined"
          value={userInput}
          onChange={(e) => handleInputChange(e)}
          sx={{ flex: 1 }}
        />

        <IconButton onClick={handleIncrementButtonClick} >
          <AddIcon />
        </IconButton>

        <IconButton onClick={handleDecrementButtonClick} >
          <RemoveIcon />
        </IconButton>
      </Stack>

      <Stack
        flexDirection={'row'}
        justifyContent="space-between"
        width={'45rem'}>

        <Stack
          flexDirection={'row'}
          gap={1}>

          <Button onClick={() => setActiveStep(prev => prev - 1)} variant="contained">Prev</Button>

          <Button onClick={() => setActiveStep(prev => prev + 1)} variant="contained" >Next</Button>
        </Stack>

        <Button onClick={handleReset} variant="contained" >Reset</Button>
      </Stack>

    </Box>

  )
}

export default App