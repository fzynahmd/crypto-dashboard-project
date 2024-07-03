import React from 'react';
import './styles.css';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import { convertNumber } from '../../../functions/convertNumber';
import { Link } from 'react-router-dom';

function List({ coin }) {
  return (
    <Link to={`/coin/${coin.id}`}>
    <tr className='list-row'>
        <Tooltip title="Coin Logo" >
      <td className='td-image'>
        <img src={coin.image} className='coin-logo' alt={coin.name} />
      </td>
      </Tooltip>
      <td>
        <div className='name-col'>
        <Tooltip title="Coin Info" >
          <p className='coin-symbol'>{coin.symbol}</p>
          <p className='coin-name'>{coin.name}</p>
          </Tooltip>
        </div>
      </td>
      {coin.price_change_percentage_24h >= 0 ? (
        <td className='chip-flex'>
            <Tooltip title="% Change in 24h" >
          <div className='price-chip '>{coin.price_change_percentage_24h.toFixed(2)}%</div>
          </Tooltip>
          <div className='icon-chip td-icon'>
            <TrendingUpRoundedIcon />
          </div>
        </td>
      ) : (
        <td className='chip-flex'>
            <Tooltip title="% Change in 24h" >
          <div className='price-chip chip-red '>{coin.price_change_percentage_24h.toFixed(2)}%</div>
          </Tooltip>
          <div className='icon-chip chip-red td-icon'>
            <TrendingDownRoundedIcon />
          </div>
        </td>
      )}
       <Tooltip title="Coin Price In INR" >
      <td>
        <h3
          className='coin-price td-center-align' 
          style={{
            color: coin.price_change_percentage_24h < 0 ? "var(--red)" : "var(--green)"
          }}>
          ₹{coin.current_price.toLocaleString()}
        </h3>
      </td>
      </Tooltip>
      <td  class="total-volume-tooltip">
      <Tooltip title="Total Volume">
        <p className='total_volume td-right-align td-total-volume'> {coin.total_volume.toLocaleString()}</p>
        </Tooltip>
      </td>
      <td className='desktop-td-mkt'>
      <Tooltip title="Market Cap in INR" >
        <p className='total_volume td-right-align'> ₹{coin.market_cap.toLocaleString()}</p>
        </Tooltip>
      </td>

      <td className='mobile-td-mkt'> 
      <Tooltip title="Market Cap in INR" >
        <p className='total_volume td-right-align '> ₹{convertNumber(coin.market_cap)}</p>
        </Tooltip>
      </td>


    </tr>
    </Link>
  );
}

export default List;
