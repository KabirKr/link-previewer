import { Box, Heading, Image, Text } from '@chakra-ui/react'

interface Props {
  heading: string
  text?: string
  image?: string
}

const MetaInfoCard = ({ heading, text, image }: Props) => {
  return (
    <Box>
      <Heading as="h2" fontSize="2xl" fontWeight="500" color="gray.600">
        {heading}
      </Heading>

      {text && (
        <Text mt="2" p="4" rounded="sm" bg="gray.100">
          {text}
        </Text>
      )}

      {image && (
        <Image
          mt="4"
          src={image}
          alt=""
          w="100%"
          maxW="600px"
          maxH="100%"
          border="1px"
          borderColor="gray.200"
        />
      )}
    </Box>
  )
}

export default MetaInfoCard
