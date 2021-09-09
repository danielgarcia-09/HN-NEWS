import { Fragment, useEffect, useState } from "react";
import Feed from "./components/Feed";
import News from "./components/News";

import useAxios from 'axios-hooks';


function App() {

  const [news, setNews] = useState([]);

  const [{ data, loading, error }, refetch] = useAxios({
    url: 'http://localhost:5000/api/news',
    method: 'GET',
  }, { manual: false, autoCancel: false })

  const [{data: setData, loading: setLoading, error: setError}, executePOST] = useAxios({
    url:'http://localhost:5000/api/news',
    method: 'POST'
  },
  { manual: true }
  )

  useEffect(()=> {
    refetch();
    setNews(data);
  }, [data, setData]);

  setInterval(()=> {
    executePOST();
  }, 1000 * 60 * 60)

  if(error) return <p>Network Error!</p>

  return (
    <Fragment>
      <Feed 
        title='HN Feed'
        subtitle='We &hearts; hacker news!'
      />
      <div className='rows'>
        {news ? ( news.map( val => (
          <News 
            key={ val._id }
            id={ val._id }
            title={ val.title }
            author={ val.author }
            url={ val.url }
            createdAt={ val.created_at }
          />
        ))) : null}
      </div>
    </Fragment>
    
  );
}

export default App;
