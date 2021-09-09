import { timeFormat } from "../helpers/time-format";
import useAxios from 'axios-hooks';
 

const News = ({id,title,author, url, createdAt}) => {

    const [{data: putData, loading: putLoading, error: putError}, executePUT] = useAxios({
        url:`http://localhost:5000/api/news/${id}`,
        method: 'PUT'
      },
      { manual: true }
    )

    const deleteNews = () => {
        executePUT();
    }

    const openLink = (url) => {
        if(!url){
            alert('No link available')
            return;
        }
        window.open(url, '_blank')
    }
     
    return ( 
        <div className='news'>
            <h3 className="title" onClick={ ()=> openLink(url) } >{title}.  <span className="author">- {author} -</span> </h3>
            <span className="time">
                { timeFormat(createdAt) }
                <i onClick={ ()=> deleteNews() } className="fas fa-trash-alt"></i>
            </span>
           
        </div>    
    );
}
 
export default News;