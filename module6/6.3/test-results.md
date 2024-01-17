# Performance test results

Brief description of the used server (choose one): HTTP/1.1 

Brief description of your computer: Desktop with decent CPU

## No Redis Cache

### Retrieving todos

http_reqs: 16157
http_req_duration - median: 5ms
http_req_duration - 99th percentile: 21.35ms

## Redis Cache

### Retrieving todos

http_reqs: 19937
http_req_duration - median: 4.99ms
http_req_duration - 99th percentile: 11.99ms

## Reflection

Brief reflection on the results of the tests -- why do you think you saw the results you saw: there is only little improvement in the median time but the time in which 99 % of requests were processed is almost halved. There are also more requests overall, indicating that having a cache increases throughput and ensures more consistent response time across all requests.