import React from 'react';
import { useGetPages } from './Query'
import { Button, Pagination } from 'antd';
import TableMain from './Components/table';
import Nav from './Components/Nav';
import { useQueryClient } from '@tanstack/react-query';


function App() {


  const { data: pages, isLoading: pagesIsLoading, error: pagesError, } = useGetPages();
  const [currentPage, setCurrentPage] = React.useState<number>();
  const [pageIndex, setPageIndex] = React.useState<number>(1);

  const queryClient = useQueryClient()


  React.useEffect(() => {
    if (pages != undefined) {
      setCurrentPage(pages[0].id)
    }
  }, [pages])

  const handlePageChange = (index: number) => {
    setPageIndex(index)
    setCurrentPage(pages[index - 1].id)
  }

  // console.log('pages', pages)
  // console.log('currentPage', currentPage)
  // console.log('pages.length', pages?.length)


  if (pagesIsLoading) return <div>loading...</div>
  if (pagesError) return <div>error...</div>
  else
    return (
      <div className="App">
        <Nav />
        {currentPage ?
          <React.Fragment>
            <Button onClick={async () => await queryClient.invalidateQueries()}>Refresh</Button>
            <TableMain pageId={currentPage} />
            <Pagination
              current={pageIndex}
              pageSize={1}
              total={pages.length}
              onChange={handlePageChange}
            />
          </React.Fragment>
          : <div>Upload To Start</div>}

      </div>
    )


}

export default App;
