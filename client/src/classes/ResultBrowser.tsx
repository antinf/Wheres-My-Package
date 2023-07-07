import { SearchQuery } from "./SearchQuery";
import { Package } from "../interfaces/interfaces";
import { resultsPerPage } from "../clientSettings";

export class ResultBrowser{
  currentPage:number;
  isLoading:boolean;
  searchQuery:SearchQuery;
  archInput:string;
  repoInput:string;
  searchInput:string;
  totalPages:number;
  resultsSnip: Package[];

  constructor(){
    this.currentPage=0;
    this.isLoading=false;
    this.archInput='any';
    this.repoInput='Any';
    this.searchInput='';
    this.totalPages = 0;
    this.resultsSnip = [];
    this.searchQuery = new SearchQuery();
  };

  handlePageChange = (modifier:number):void=>{
    const currentPage:number = this.currentPage;
    //returns the next page based on the modifier provided
    const getNextPage = function():number{
      if (modifier===-1){
        return currentPage-1;
      }else if (modifier===1){
        return currentPage+1;
      }else{
        return 1;
      }
    };
    const nextPage:number = getNextPage();
    //only update next page if the page is within valid range and a valid number
    if (nextPage && nextPage<=this.totalPages){
      this.currentPage=nextPage;
    };
  };
  
  getResultsSnip = ():Package[]=>{
    //validate current page, we can assume that if there are results and the page is 0 or lower it was in error
    if (this.currentPage<=0 && this.searchQuery.results) this.currentPage=1;
    //set the total number of pages rounding the page up so the last page of search results is not cut off
    this.totalPages = Math.ceil(this.searchQuery.results.length/resultsPerPage);
    if (this.totalPages>0){
      this.resultsSnip = this.searchQuery.results.slice((this.currentPage - 1) * resultsPerPage, this.currentPage * resultsPerPage);
    }else{
      this.resultsSnip = [];
    };
    return this.resultsSnip;
  };
  
  getResultClass = (result:Package):string=>{
    //alternate background colors by adding results-alt-item class to every other item
    if (this.resultsSnip.indexOf(result)%2===1){
      return 'result results-alt-item';
    }else{
      return 'result';
    }
  };
  getResultsLength = ():number=>{
    if (this.searchQuery.results){
      return this.searchQuery.results.length;
    }else{
      return 0;
    }
  };

  //if the search is loading show the spinning loading image
  getLoadingImgStyle = ()=>{
    if (this.isLoading){
      return 'block';
    }else{
      return 'none';
    }
  };

  //gets the current button text color for the search and lucky buttons
  getButtonTextColor = ():string=>{
    //if the loading display is block we can assume the loading img is being shown to the user
    if (this.isLoading){
      return 'grey'; //the loading image is currently being shown to the user
    }else{
      return 'black'; //the loading image is not currently being shown to the user (set buttons to regular styling color)
    }
  };
  //disable search buttons from the user preventing searches from being performed
  lockSearch = ()=>{
    //lock buttons
    const searchButton:any = document.querySelector('.search-button');
    const luckyButton:any = document.querySelector('.lucky-button');
    searchButton.disabled = true;
    luckyButton.disabled = true;
    this.isLoading=true;
  }
  //unlock search buttons so the user can use them
  unlockSearch =()=>{
    //lock buttons
    const searchButton:any = document.querySelector('.search-button');
    const luckyButton:any = document.querySelector('.lucky-button');
    searchButton.disabled = false;
    luckyButton.disabled = false;
    this.isLoading=false;
  }
  //sets the input based on provided input type
  setInput = (type:string,input:string):void=>{
    switch (type){
      case 'arch':
        this.archInput = input;
        break;
      case 'repo':
        this.repoInput = input;
        break;
      case 'search':
        this.searchInput = input;
        break;
      default:
        break;
    };
  };

  filterResults = ():Package[]=>{
    // add the snippet property to this class
    let tempResults:Package[] = [];
    //filter array by architecture
    tempResults = this.searchQuery.results.filter((result:any)=>{
      //if the any field is selected then return every item
      if (this.archInput.toLowerCase()==='any') return true;
      //otherwise compare the result's architecture to the user selected architecture filter
      return result.arch===this.archInput;
    });
    //filter array by repository
    tempResults = this.searchQuery.results.filter((result:any)=>{
      //if the any field is selected then return every item
      if (this.repoInput.toLowerCase()==='any') return true;
      //otherwise compare the result's repository to the user selected repository filter
      return result.repo===this.repoInput.toLowerCase();
    });
    if (this.searchQuery.exactMatch){
      const pkgname = this.searchQuery.exactMatch.pkgname;
      //remove the exact match from the searchResults arr
      tempResults = this.searchQuery.results.filter((result:any)=>{
        return result.pkgname!==pkgname;
      })
      //set the exact match as the first result
      tempResults.unshift(this.searchQuery.exactMatch);
    };
    this.searchQuery.results=tempResults;
    return tempResults;
  };
};