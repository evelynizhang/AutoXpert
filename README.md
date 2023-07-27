# CarCar

Team:

* Evelyn Zhang - Service microservice
* My Nguyen - Sales microservice

## Design

## Service microservice

In the service microservice, users are able to add a technician and view a list of technicians. Users are also able to create a service appointment witht the form provided, and view and change status of the service in the service appointment tab.

## Sales microservice

The Sales microservice tracks automobile sales of automobiles listed in the inventory microservice. Using a poller, the sales microservice is able to reference the inventory's  automobile resource data changes. Through its salesperson and customer resources, the sales microservice can link each automobile sale to a salesperson and a customer.
