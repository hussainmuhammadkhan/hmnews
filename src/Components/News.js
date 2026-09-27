import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types';

export default class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
    static defaultProps = {
    country: 'us',
    pageSize: 6,
    category:'general'
  }
  capitilized = (string)=>{
    return string.charAt(0).toUpperCase()+ string.slice(1);

  }
   constructor(props){
    super(props);
    this.state={
        // articles: this.article,
        articles: [],
        loading: false,
        page: 1,
        totalResults: 0
    }
    document.title=`${this.capitilized(this.props.category)} -  HM News`;
  }
  async updateNews(){
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7f0d9196cbd4b7f81b11e42739b5b16&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data= await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({articles: parseData.articles,
    totalResults: parseData.totalResults,
    loading: false
    })
  }
  async componentDidMount(){
    // let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7f0d9196cbd4b7f81b11e42739b5b16&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data= await fetch(url);
    // let parseData = await data.json()
    // console.log(parseData);
    // this.setState({articles: parseData.articles,
    // totalResults: parseData.totalResults,
    // loading: false
    // })
    this.updateNews();
  }
   handlePreClick= async ()=>{
    // let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7f0d9196cbd4b7f81b11e42739b5b16&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data= await fetch(url);
    // let parseData = await data.json()
    // console.log(parseData);
    // this.setState({
    //   page: this.state.page -1,
    //   articles: parseData.articles,
    //   loading: false})
    this.setState({
      page: this.state.page -1
      });
      this.updateNews();
    
  }
  handleNextClick= async ()=>{
    // if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){

    // let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7f0d9196cbd4b7f81b11e42739b5b16&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data= await fetch(url);
    // let parseData = await data.json()
    // // console.log(parseData);
    // this.setState({
    //   page: this.state.page +1,
    //   articles: parseData.articles,
    //   loading: false})
    // }
    
    this.setState({
      page: this.state.page +1
      });
      this.updateNews();
  }
   fetchMoreData = async () => {
    // this.setState({
    //   page: this.state.page+1
    // })
     const nextPage = this.state.page + 1;
     let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7f0d9196cbd4b7f81b11e42739b5b16&page=${nextPage}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data= await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
    articles: this.state.articles.concat( parseData.articles),
    totalResults: parseData.totalResults,
    loading: false
    })
  };
  render() {
    return (
      <>
        
          <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>Hm News - Top Headlines of {this.capitilized(this.props.category)} catagory</h1>
          <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
            <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
          {this.state.loading && <Spinner/>}
          {/* <h2 className='text-centre'></h2> */}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className='container my-3'>
          <div className='row'>
            {!this.state.loadin && this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title:""} description={element.description? element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
            })}
            
          </div>
          </div>
          </InfiniteScroll>
        
      </>
    );
  }
}
