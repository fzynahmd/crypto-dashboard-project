import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Common/Header';
import Loader from '../components/Common/Loader';
import axios from 'axios';
import { CoinObject } from '../functions/convertObject';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import LineChart from '../components/Coin/LineChart';
import { convertDate } from '../functions/convertDate';
import SelectDay from '../components/Coin/SelectDays';
import { settingCharData } from '../functions/settingChartData';

function CoinPage() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [coinData, setCoinData] = useState(null);
    const [days, setDays] = useState(120);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]);

    async function getData() {
        const data = await getCoinData(id);
        if (data) {
            CoinObject(setCoinData, data);
            const prices = await getCoinPrices(id, days);
            if (prices.length > 0) {
                setChartData({
                    labels: prices.map((price) => convertDate(price[0])),
                    datasets: [{
                        data: prices.map((price) => price[1]),
                        borderColor: "#3a80e9",
                        borderWidth: 2,
                        fill: true,
                        tension: 0.25,
                        backgroundColor: "rgba(58,128,233,0.1)",
                        borderColor: "#3a80e9",
                        pointRadius: 0,
                        yAxisID: "y",
                    },],
                });
                setIsLoading(false);
            }
        }
    }

    const handleDaysChange = async (event) => {
        setIsLoading(true);
        setDays(event.target.value);
        const prices = await getCoinPrices(id, event.target.value);
        if (prices.length > 0) {
            settingCharData(setChartData, prices);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header />
            {isLoading ? <Loader /> : (
                <>
                    <div className='grey-wrapper'>
                        {coinData && <List coin={coinData} />}
                    </div>
                    <div className='grey-wrapper'>
                        <SelectDay days={days} handleDaysChange={handleDaysChange} />
                        <LineChart chartData={chartData} />
                    </div>
                    {coinData && <CoinInfo heading={coinData.name} desc={coinData.desc} />}
                </>
            )}
        </div>
    );
}

export default CoinPage;
