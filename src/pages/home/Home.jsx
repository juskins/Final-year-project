import  { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import DonutChart from "../../components/donutChart/Donutchart";
import HistogramChart from "../../components/barchart/Barchart";
import { useDarkModeContext } from "../../context/darkModeContext";
import moment from "moment";
const Home = () => {
  const { allProducts, getAllProducts } = useDarkModeContext();
  
  console.log(allProducts);
   const [freshProducts , setFreshProducts] = useState([]);
    const [expMonthProducts , setExpMonthProducts] = useState([]);
    const [expiredProducts , setExpiredProducts] = useState([]);
    const [totalProducts , setTotalProducts] = useState([]);

    useEffect (() => {
      setFreshProducts(allProducts.filter((product) => product.days_remaining > 30 ));
      setExpMonthProducts(allProducts.filter((product) => product.days_remaining < 30 && product.days_remaining > 0 ));
      setExpiredProducts(allProducts.filter((product) => product.days_remaining < 0));
      setTotalProducts(allProducts.length);
  }, [allProducts]);


 useEffect(() => {
  const user = localStorage.getItem('user')
  if(user){
    getAllProducts()
  }
 },[])
      
  return (
    <div className="home">
      
      <div className="homeContainer">
          
        <div className="widgets">
          <Widget type="fresh" amount={freshProducts.length} />
          <Widget type="exp_month" amount={expMonthProducts.length} />
          <Widget type="expired" amount={expiredProducts.length} />
          <Widget type="total_prod" amount={totalProducts} />
        </div>
        <div className="charts">
          <DonutChart
            freshCount={freshProducts.length}
            expiringSoonCount={expMonthProducts.length}
            expiredCount={expiredProducts.length}
          />
          <Chart title="Last 6 Months (Products expired)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Products Expiring Soon (Top 10)</div>
          {/* <Table data={allProducts} /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
