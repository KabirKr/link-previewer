import { Table, Tbody, Tr, Td, TableContainer } from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import { WebsiteMetaData } from '@/types/types'

interface Props {
  metaData: WebsiteMetaData
}

const MetaTable = ({ metaData }: Props) => {
  return (
    <TableContainer w="full">
      <Table variant="simple">
        <Tbody>
          <>
            <Tr>
              <Td>Title</Td>
              <Td>{metaData?.title}</Td>
            </Tr>
            <Tr>
              <Td>Description</Td>
              <Td>{metaData?.description}</Td>
            </Tr>
            {metaData?.metaTags.map((meta) =>
              meta.name ? (
                <Tr key={nanoid()}>
                  <Td>{meta.name}</Td>
                  <Td>{meta.content}</Td>
                </Tr>
              ) : (
                <Tr key={nanoid()}>
                  <Td>{meta.property}</Td>
                  <Td>{meta.content}</Td>
                </Tr>
              )
            )}
          </>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default MetaTable
