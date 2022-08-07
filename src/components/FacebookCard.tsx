import { Box, Text } from '@chakra-ui/react'

interface Props {
  title: string
  description: string
  image: string
  url: string
}

const FacebookCard = ({ title, description, image, url }: Props) => {
  return (
    <Box w="524px" maxW="full" overflow="hidden">
      <Box
        width="full"
        height="273px"
        backgroundImage={image}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPos="center"
        border="1px"
        borderColor="gray.200"
      />

      <Box
        height="85px"
        px="2.5"
        py="3"
        bgColor="#f2f3f5"
        border="1px"
        borderColor="gray.300"
        overflow="hidden"
      >
        <Text fontSize="12px" color="gray.600" textTransform="uppercase">
          {url}
        </Text>
        <Box>
          <Text color="gray.900" fontWeight="600">
            {title}
          </Text>
          <Text
            fontSize="14px"
            color="gray.800"
            width="calc(100% - 20px)"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {description}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default FacebookCard
