import { useState } from 'react'
import { type NextPage } from 'next'
import { NextSeo, type NextSeoProps } from 'next-seo'
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
} from '@chakra-ui/react'

const HomePage: NextPage = () => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = () => {
    // Send value to backend
    fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({
        value: inputValue,
      }),
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error(err)
      })

    // Clear input
    setInputValue('')
  }

  return (
    <Box bg="gray.900" minH="100vh" color="gray.300" p="10">
      <Container maxW="container.lg">
        <Heading as="h1" fontSize="4xl" textAlign="center" color="white">
          Link Previewer
        </Heading>

        <HStack mt="10">
          <Input
            size="lg"
            placeholder="Enter url..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button colorScheme="green" size="lg" onClick={handleSubmit}>
            Go
          </Button>
        </HStack>
      </Container>
    </Box>
  )
}

export default HomePage
