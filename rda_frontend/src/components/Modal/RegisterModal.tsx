import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'


const RegisterModal = () => {
  return (
    <>
    <div className='relative'>

   
    <Menu>
  <MenuButton
    px={4}
    py={2}
    transition='all 0.2s'
    borderRadius='md'
  
    _hover={{ bg: 'gray.800' }}
    _expanded={{ bg: 'blue.400' }}
    
  >
    File 
  </MenuButton>
  <MenuList  >
    <MenuItem >New File</MenuItem>
    <MenuItem>New Window</MenuItem>
  </MenuList>
</Menu> </div>
</>
  )
}

export default RegisterModal