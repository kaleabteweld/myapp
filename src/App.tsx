import React from 'react';
import { useGetPages } from './Query'
import { Button, Pagination } from 'antd';
import TableMain from './Components/table';
import Nav from './Components/Nav';
import { useQueryClient } from '@tanstack/react-query';


function App() {


  const { data: pages, isLoading: pagesIsLoading, error: pagesError, } = useGetPages();
  const [currentPage, setCurrentPage] = React.useState<number>();

  const queryClient = useQueryClient()


  React.useEffect(() => {
    if (pages != undefined) {
      setCurrentPage(pages[0].id)
    }
  }, [pages])

  const handlePageChange = (index: number) => {
    setCurrentPage(pages[index - 1].id)
  }



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
              current={currentPage % pages.length}
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
