import { FormEvent, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  Spinner,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { nanoid } from 'nanoid'

import FacebookCard from '@/components/FacebookCard'
import TwitterCard from '@/components/TwitterCard'
import MetaInfoCard from '@/components/MetaInfoCard'
import MetaTable from '@/components/MetaTable'

// Types
import { type NextPage } from 'next'
import { WebsiteMetaData } from '@/types/types'

const HomePage: NextPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [websiteMetaData, setWebsiteMetaData] =
    useState<WebsiteMetaData | null>(null)

  // Toast
  const toast = useToast()

  // Open graph meta
  const [ogTitle, setOgTitle] = useState(websiteMetaData?.title)
  const [ogDescription, setOgDescription] = useState(
    websiteMetaData?.description
  )
  const [ogImage, setOgImage] = useState('')
  const [ogUrl, setOgUrl] = useState('')

  // Twitter meta
  const [twitterTitle, setTwitterTitle] = useState(websiteMetaData?.title)
  const [twitterDescription, setTwitterDescription] = useState(
    websiteMetaData?.description
  )
  const [twitterImage, setTwitterImage] = useState('')
  const [twitterUrl, setTwitterUrl] = useState('')

  const cleanUrl = (str: string): string => {
    try {
      const url = new URL(str)
      return url.hostname
    } catch (error) {
      return ''
    }
  }

  useEffect(() => {
    // Serialize meta data for fb and twitter card
    websiteMetaData?.metaTags.forEach((value) => {
      // Set opengraph data
      if (value.property === 'og:title') {
        setOgTitle(value.content ?? '')
      } else if (value.property === 'og:description') {
        setOgDescription(value.content ?? '')
      } else if (value.property === 'og:image') {
        setOgImage(value.content ?? '')
      } else if (value.property === 'og:url') {
        setOgUrl(cleanUrl(value.content ?? ''))
      }

      // Set twitter data
      if (value.name === 'twitter:title') {
        setTwitterTitle(value.content ?? '')
      } else if (value.name === 'twitter:description') {
        setTwitterDescription(value.content ?? '')
      } else if (value.name === 'twitter:image') {
        setTwitterImage(value.content ?? '')
      } else if (value.name === 'twitter:url') {
        setTwitterUrl(cleanUrl(value.content ?? ''))
      }
    })
  }, [websiteMetaData])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const pattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i'
    )

    if (!pattern.test(inputValue)) {
      toast({
        title: 'Invalid link!',
        description: 'Please enter a valid link',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })

      return
    }

    setIsLoading(true)

    // Send value to backend
    axios
      .post('/api/search', { url: inputValue })
      .then((res) => {
        if (res.status !== 200) {
          toast({
            title: 'Something went wrong!',
            description: 'Please try entering a different link',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
          setIsLoading(false)
        }

        setWebsiteMetaData(res.data.data)
        setIsLoading(false)
      })
      .catch((err) => {
        toast({
          title: 'Error!',
          description: err.message ?? 'Please try entering a different link',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        setIsLoading(false)
      })
  }

  return (
    <Box minH="100vh" color="gray.800" py="10">
      <Container maxW="container.lg">
        <VStack alignItems="stretch" spacing="10">
          <Box textAlign="center">
            <Heading as="h1" fontSize="4xl" textAlign="center" color="gray.800">
              Link Previewer
            </Heading>
            <Text color="gray.600">
              Enter a link and preview social card, title, desctiption and other
              meta data
            </Text>
          </Box>

          {/* Search bar */}
          <HStack as="form" onSubmit={handleSubmit}>
            <Input
              type="text"
              size="lg"
              placeholder="Enter url..."
              borderColor="gray.500"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              type="submit"
              colorScheme="green"
              size="lg"
              disabled={!inputValue || isLoading}
              isLoading={isLoading}
            >
              Go
            </Button>
          </HStack>

          {isLoading && <Spinner />}

          {websiteMetaData && !isLoading && (
            <>
              {/* Social share preview card */}
              <VStack alignItems="stretch" spacing="6">
                <Heading
                  as="h2"
                  fontSize="2xl"
                  fontWeight="500"
                  color="gray.600"
                >
                  Social card preview
                </Heading>

                <Box>
                  <FacebookCard
                    title={ogTitle ?? ''}
                    description={ogDescription ?? ''}
                    image={ogImage ?? ''}
                    url={ogUrl ?? ''}
                  />

                  <Text mt="3">Facebook link preview</Text>
                </Box>

                <Box>
                  <TwitterCard
                    title={twitterTitle ?? ''}
                    description={twitterDescription ?? ''}
                    image={twitterImage ?? ''}
                    url={twitterUrl ?? ''}
                  />

                  <Text mt="3">Twitter link preview</Text>
                </Box>
              </VStack>

              {/* Meta Info */}
              <VStack alignItems="stretch" spacing="6" w="100">
                <MetaInfoCard
                  heading={'Title'}
                  text={websiteMetaData?.title ?? 'No title'}
                />

                <MetaInfoCard
                  heading={'Description'}
                  text={websiteMetaData?.description ?? 'No description'}
                />

                <MetaInfoCard heading={'Image'} image={ogImage ?? ''} />

                <MetaInfoCard heading={'Favicons'} />
                <HStack bg="gray.100" p="4" alignItems="baseline" spacing="10">
                  {websiteMetaData?.favicons &&
                    websiteMetaData.favicons.map((icon) => {
                      const size = icon.sizes?.split('x')[0]
                      return (
                        <Image
                          key={nanoid()}
                          src={icon.href}
                          alt=""
                          w={size ?? '16'}
                          h={size ?? '16'}
                        />
                      )
                    })}
                </HStack>

                <MetaInfoCard heading="Website Address" text={ogUrl} />
              </VStack>

              {/* Raw meta data */}
              <VStack alignItems="stretch">
                <Heading
                  as="h2"
                  fontSize="2xl"
                  fontWeight="500"
                  color="gray.600"
                >
                  Raw meta data
                </Heading>

                <MetaTable metaData={websiteMetaData} />
              </VStack>
            </>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default HomePage
