import { Alert, AlertIcon, Stack } from "@chakra-ui/react"


const ErrorMessage = ({children}: {children: React.ReactNode}) => {
  return (
    <Stack spacing={3} mt={4} >
      <Alert status="error" className="rounded-md ">
         <AlertIcon/>
        {children}
      </Alert>
      </Stack>
  )
}

export default ErrorMessage