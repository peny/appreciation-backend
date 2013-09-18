appreciation-backend
====================

The backend for a TicTail app that automatically values a product based on an image using Amazon Mechanical Turk.

The application a POST with an image plus the following information:
  {
    accesstoken: YOUR-TICTAIL-ACCESS-TOKEN,
    storeid: YOUR-TICTAIL-STORE-ID,
    storedashboardurl: YOUR-TICTAIL-STORE-DASHBOARD-URL
  }
  
When the valuation is done the application will send a notification to the feed of the storeid.
