SELECT
a.dt::text initialdate,
a.date initialdateformat,
b.dt::text nextdate,
b.date nextdateformat,
a.p platform,
sum(theta_sketch_get_estimate(a.usercount)) initialdatecount,
sum(theta_sketch_get_estimate(theta_sketch_intersection(a.usercount, b.usercount))) nextdatecount
from (SELECT distinct on (date, p)
dt,
CONCAT(to_char(dt, 'yyyy'), ' ', DATE_PART('week', dt)) AS date,
p,
theta_sketch_union(usercount) as usercount
FROM datasketches_events_${appid:value} m
WHERE m.eventkey=${firstEvent}
GROUP BY date, p, dt
ORDER BY date) a
Join (SELECT distinct on (date, p)
dt,
CONCAT(to_char(dt, 'yyyy'), ' ', DATE_PART('week', dt)) AS date,
p,
theta_sketch_union(usercount) as usercount
FROM datasketches_events_${appid:value} n
WHERE n.eventkey=${secondEvent}
GROUP BY date, p, dt
ORDER BY date) b on a.p = b.p
WHERE RIGHT(a.date, 2) <= RIGHT(b.date, 2)
GROUP BY initialdate, nextdate, initialdateformat, nextdateformat, platform
ORDER BY initialdate ASC