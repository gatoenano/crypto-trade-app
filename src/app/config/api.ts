// Core
import { HttpHeaders } from '@angular/common/http';

// API config
const APIUrl = 'http://localhost:5001/listOrders';
const APIHeaders = new HttpHeaders({
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json; charset=utf-8'
});

export const API = {
  headers: APIHeaders,
  ordersUrl: APIUrl
};
