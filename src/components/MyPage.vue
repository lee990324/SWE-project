<template>
    <div class="my">
      <h1>My Stocks</h1>
      <table>
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>Quantity Held</th>
            <th>Purchase Price</th>
            <th>Current Price</th>
            <th>Rate of Return</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stock in stocks" :key="stock.name">
            <td>{{ stock.name }}</td>
            <td>{{ stock.quantity }}</td>
            <td>{{ stock.purchasePrice }}</td>
            <td>{{ stock.currentPrice }}</td>
            <td :class="getRateOfReturnClass(stock)">
              {{ calculateRateOfReturn(stock) }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        stocks: [
          {
            name: 'Stock A',
            quantity: 10,
            purchasePrice: 100,
            currentPrice: 110
          },
          {
            name: 'Stock B',
            quantity: 5,
            purchasePrice: 200,
            currentPrice: 190
          },
          // Add more stocks as needed
        ]
      };
    },
    methods: {
      calculateRateOfReturn(stock) {
        const rate = ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) * 100;
        return rate.toFixed(2); // Keep two decimal places
      },
      getRateOfReturnClass(stock) {
        const rate = (stock.currentPrice - stock.purchasePrice) / stock.purchasePrice;
        return rate >= 0 ? 'positive' : 'negative';
      }
    }
  };
  </script>
  
  <style scoped>
  .my {
    text-align: center;
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .positive {
    color: green;
  }
  
  .negative {
    color: red;
  }
  </style>