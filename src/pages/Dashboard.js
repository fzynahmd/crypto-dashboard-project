import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
import axios from "axios";
import Search from '../components/Dashboard/Search';
import PaginationControlled from '../components/Dashboard/Pagination';
import Pagination from '../components/Dashboard/Pagination';
import PaginationComponent from '../components/Dashboard/Pagination';
import Loader from '../components/Common/Loader';
import TopButton from '../components/Common/BackToTop';
import BackToTop from '../components/Common/BackToTop';
import { get100Coins } from '../functions/get100Coins';
function DashboardPage() {
    const [coins,setCoins]=useState([]);
    const [search,setSearch]=useState("");
    const [paginatedCoins,setPagintedCoins]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    
    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };
    const [page, setPage] = React.useState(1);
  const handlePageChange = (event,value) => {
    setPage(value);
    var previousIndex=(value-1) *10;
    setPagintedCoins(coins.slice(previousIndex,previousIndex+10));
  };
    var filteredCoins = coins.filter((item)=>
    item.name.toLowerCase().includes(search.toLowerCase() ) ||
    item.symbol.toLowerCase().includes(search.toLowerCase())
    );
    useEffect(()=>{
     getData()
    },[]);

    const getData =async()=>{
        const myCoins=await get100Coins();
        if(myCoins)
        {
        setCoins(myCoins);
        setPagintedCoins(myCoins.slice(0,10));
        setIsLoading(false);
        }
    }
  return (
    <>
        <Header />
        <BackToTop/>
        {isLoading ? (
            <Loader/>
        ) : (
    <div>
    <Search search={search} handleChange={onSearchChange} />
    <TabsComponent coins={search ? filteredCoins :paginatedCoins} />
    {!search && (<PaginationComponent page={page } handlePageChange={handlePageChange}/> )};
    </div>
  )}
  </>
)}

export default DashboardPage