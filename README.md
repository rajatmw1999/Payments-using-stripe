# Payments-using-stripe

A simple and primitive web application making use of stripe.com to provide a payment gateway to purchase various products of different amount of prices.

To use this application, first the developer need to sign up with stripe.com and acquire their publicAPIkey and privateAPIkey and place them in appropraite variables provided in the starting of app.js file.
A seedjs() function is also provided to seed the database with an initial data of products and their prices. After the firsy run of the server file, comment out seedjs() to avoid saving the same data to database multiple times.

This website takes into account the vulnerability of payments when only front end is used to determine the amount of product purchased. Thus, an additional functionality of checking the amount of a product with its saved data in database is provided. 
This makes this payment gateway very secure and reliable.
